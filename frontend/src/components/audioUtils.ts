export const convertToWav = async (blob: Blob): Promise<Blob> => {
    // If already WAV, return as-is
    if (blob.type === 'audio/wav') return blob;
  
    // Convert other formats to WAV
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    return new Blob([encodeWAV(audioBuffer)], { type: 'audio/wav' });
  };
  
  function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = 16;
    const format = 1; // PCM
    const blockAlign = numChannels * (bitsPerSample / 8);
    const byteRate = sampleRate * blockAlign;
    const dataSize = audioBuffer.length * numChannels * (bitsPerSample / 8);
  
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
  
    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);
  
    // Write PCM samples
    const offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        view.setInt16(offset + (i * numChannels + channel) * 2, sample < 0 ? sample * 32768 : sample * 32767, true);
      }
    }
  
    return buffer;
  }
  
  function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }