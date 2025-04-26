
from minio import Minio
from dotenv import load_dotenv
from datetime import datetime
import os
from io import BytesIO


load_dotenv("./deployment/.env")

url = os.getenv("MINIO_URL")
key = os.getenv("MINIO_ACCESS_KEY")
secret = os.getenv("MINIO_SECRET_KEY")

# Initialize MinIO client
minio_client = Minio(url, access_key=key, secret_key=secret, secure=False)


def get_file(id: str, stage: str):
    response = None
    try:
        if stage == "raw":
            response = minio_client.get_object(bucket_name="rawaudio", object_name=id)

        elif stage == "processed":
            response = minio_client.get_object(bucket_name="processedaudio", object_name=id)
        file = response.read()
        return file
    
    except Exception as e:
        raise RuntimeError(f"File not found: {e}") from e
    
    finally:
        if response:
            response.close()
            response.release_conn()



def save_file(id: str, file: bytes, stage: str):
    file =  BytesIO(file)
    try:
        if stage == "raw":
            response = minio_client.put_object(
                bucket_name="rawaudio",
                data=file, 
                object_name=id,
                length=-1,
                part_size=10*1024*1024
            )

        elif stage == "processed":
            response = minio_client.put_object(
                bucket_name="processedaudio",
                data=file, 
                object_name=id,
                length=-1,
                part_size=10*1024*1024
            )
            created_time = datetime.strptime(response.http_headers["Date"],  "%a, %d %b %Y %H:%M:%S GMT" ) 
            return created_time
    
    except Exception as e:
        raise RuntimeError(f"File upload to Minio failed: {e}") from e
