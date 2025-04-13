import outetts
from io import BytesIO

# pip install git+https://github.com/kaoutaar/OuteTTS.git

conf = outetts.ModelConfig(
    model_path="app/aicore/tts/OuteTTS-0.1-350M-Q8_0.gguf",
    tokenizer_path="OuteAI/OuteTTS-0.1-350M",
    interface_version=outetts.InterfaceVersion.V1,
    backend=outetts.Backend.LLAMACPP,
)

interface = outetts.Interface(config=conf)

def tts_clone(file: BytesIO, text: str) -> bytes :
    speaker = interface.create_speaker(audio_path=file, transcript=text)
    # interface.save_speaker(speaker, "speaker.json")
    # speaker = interface.load_speaker("speaker.json")

    gen_cfg = outetts.GenerationConfig(
        text=text,
        generation_type=outetts.GenerationType.REGULAR,
        speaker=speaker,
        max_length=8192,
        sampler_config=outetts.SamplerConfig(
            temperature=0.4,
            repetition_penalty=1.1,
            top_k=40,
            top_p=0.9,
        ),
    )

    output = interface.generate(config=gen_cfg)
    buffer = BytesIO()
    output.save(buffer)
    result = buffer.getvalue()

    return result