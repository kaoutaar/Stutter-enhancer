import subprocess
from io import BytesIO

def convert_audio(input_bytes: bytes, output_format="wav") -> BytesIO:
    process = subprocess.run(
        [
            "ffmpeg",
            "-i", "pipe:0",       # read input from stdin
            "-f", output_format,  
            "pipe:1"              # write output to stdout
        ],
        input=input_bytes,       # send the input bytes to ffmpeg's stdin
        stdout=subprocess.PIPE,  # capture output from stdout
        stderr=subprocess.PIPE   # capture any errors from stderr
    )

    if process.returncode != 0:
        raise RuntimeError(f"ffmpeg error:\n{process.stderr.decode()}")

    return BytesIO(process.stdout)
