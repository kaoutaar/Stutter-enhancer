from whispercpp import Whisper
from io import BytesIO
import librosa

#resources
# pip install git+https://github.com/stlukey/whispercpp.py
# https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file


w = Whisper('tiny')

def sttmodel(file: BytesIO):
    audio_data, sample_rate = librosa.load(file, sr=16000)
    try:
        result = w.transcribe(audio_data) #takes np.array
        text = w.extract_text(result)
        return text
    except Exception as e:
        raise RuntimeError(f"Can't transcribe audio: {e}") from e

