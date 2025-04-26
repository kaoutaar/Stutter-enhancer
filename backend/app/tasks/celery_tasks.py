from ..celery_config import celery_app
from ..service.db_srv import *
from ..service.minio_srv import *
from ..db.session import get_db
from mutagen import File as MutagenFile
from io import BytesIO



@celery_app.task
def save_raw_table(metadata):
    with get_db() as db:
        save_table(metadata=metadata, db=db, table="raw")
    

@celery_app.task
def save_raw_file(id, file):
    save_file(id, file, stage="raw")
    
# (time_limit=300, soft_time_limit=180, bind=True, max_retries=3,)
@celery_app.task(name="speech_to_text", ignore_result=False)
def speech_to_text(arg, id):
    from ..aicore.stt import whisperstt
    filebytes = get_file(id, stage="raw")
    transcript = whisperstt.sttmodel(BytesIO(filebytes))
    return transcript


@celery_app.task
def update_transcript(id, text):
    with get_db() as db:
        update_table(id, text, db)
    

def get_metadata(file:bytes):
    iofile = BytesIO(file)
    audio = MutagenFile(iofile)
    length = audio.info.length
    iofile.seek(0, 2)  # Go to end of file to get size
    size_bytes = iofile.tell()     
    return  {"length":length, "size":size_bytes}


@celery_app.task(name="text_to_speech")
def text_to_speech(id, text):
    from ..aicore.tts import ttsclone
    with get_db() as db:
        filebytes = get_file(id, stage="raw")
        procfile = ttsclone.tts_clone(BytesIO(filebytes), text) 
        created_time = save_file(id, procfile, stage="processed")
        metadata = {"id":id, "created_time": created_time}
        d = get_metadata(procfile)
        metadata.update(d)
        save_table(metadata=metadata, db=db, table="processed")
