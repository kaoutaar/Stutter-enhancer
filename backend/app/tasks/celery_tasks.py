from celery_config import celery_app
from service.db_srv import *
from service.minio_srv import *
from aicore.stt.whisperstt import *
from aicore.tts.ttsclone import *
from mutagen import File
from io import BytesIO



@celery_app.task
def save_raw_table(metadata, db):
    save_table(metadata=metadata, db=db, table="raw")
    

@celery_app.task
def save_raw_file(id, file):
    save_file(id, file, stage="raw")
    

@celery_app.task(name="speech_to_text", ignore_result=False)
def speech_to_text(id):
    filebytes = get_file(id, stage="raw")
    transcript = sttmodel(BytesIO(filebytes))
    return transcript


@celery_app.task
def update_transcript(id, text, db):
    update_table(id, text, db)
    

def get_metadata(file):
    iofile = BytesIO(file)
    audio = File(iofile)
    length = audio.info.length
    file.seek(0, 2)  # Go to end of file to get size
    size_bytes = file.tell()     
    return  {"length":length, "size":size_bytes}


@celery_app.task(name="text_to_speech")
def text_to_speech(id, text, db):
    filebytes = get_file(id, stage="raw")
    procfile = tts_clone(BytesIO(filebytes), text) 
    created_time = save_file(id, BytesIO(procfile), stage="processed")
    metadata = {"id":id, "created_time": created_time}
    d = get_metadata(procfile)
    metadata.update(d)
    save_table(metadata=metadata, db=db, table="processed")
    





