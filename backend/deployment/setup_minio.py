from minio import Minio
from minio.error import S3Error
from dotenv import load_dotenv
import os


load_dotenv("./deployment/.env")

url = os.getenv("MINIO_URL")
key = os.getenv("MINIO_ACCESS_KEY")
secret = os.getenv("MINIO_SECRET_KEY")

minio_client = Minio(url, access_key=key, secret_key=secret, secure=False)

def create_minio_bucket(bucket_name: str):
    try:
        if not minio_client.bucket_exists(bucket_name):
            minio_client.make_bucket(bucket_name)
            print(f"Bucket '{bucket_name}' created successfully!")
        else:
            print(f"Bucket '{bucket_name}' already exists.")
    except S3Error as e:
        print(f"Error occurred while checking or creating bucket: {e}")

create_minio_bucket("rawaudio")
create_minio_bucket("processedaudio")
