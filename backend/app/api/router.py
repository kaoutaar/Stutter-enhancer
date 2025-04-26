from fastapi import APIRouter, HTTPException, Depends
from fastapi import File, UploadFile, Form, Query
from fastapi.responses import JSONResponse, StreamingResponse
from io import BytesIO
from typing import Annotated
import uuid
from ..service.minio_srv import *
from ..schema.audio import AudioIn, AudioOut
from ..schema.transcript import TranscriptIn, TranscriptOut
from ..tasks.celery_tasks import *
from celery.result import AsyncResult
import json



router = APIRouter(prefix = "/enhance_audio")



@router.get("/", tags=["audio"])
async def get_home():
    return "Home Page"


@router.post("/", tags=["audio"])
async def submit_raw_audio(
    audiofile: Annotated[bytes, File()],
    metadata: str=Form()
):
    """
    Submits a raw audio file for processing, validates file type, and initiates the task chain for saving and transcribing the audio.

    - Validates the audio file type.
    - Creates a unique file ID and updates the metadata.
    - Initiates the task chain for processing the audio.
    """

    metadata = json.loads(metadata)
    file_id = str(uuid.uuid4())
    #chain tasks:
    task_chain = save_raw_file.s(file_id, audiofile) | speech_to_text.s(id=file_id)
    task = task_chain.apply_async()
    metadata.update({"id":file_id})
    print(metadata)
    save_raw_table.delay(metadata)

    return {"task_id":task.id, "file_id":file_id, "status_url": f"/enhance-audio/text/{file_id}"}



@router.get("/text/{file_id}", tags=["audio"], response_model=TranscriptOut)
async def get_stt_suggestion(file_id:str, task_id: str=Query()):
    """
    Retrieves the status and result of the STT task based on the task_id.

    - Returns the task status (Processing, Failed, etc.) and content when the task is completed.
    """
    try:
        result = AsyncResult(task_id, app=celery_app)
        state = result.state

        if state == "PENDING":
            return JSONResponse(
                content={
                    "id":file_id, 
                    "status": "Processing",
                    "message": "",
                    "transcript": ""
                },
                status_code=202
            )
        
        if state == "SUCCESS":
            txt = result.result
            return JSONResponse(
                content={
                    "id":file_id, 
                    "status": "Success",
                    "message": "", 
                    "transcript": txt
                },
                status_code=200
            )
        
        if state == "FAILURE":
            return JSONResponse(
                content={
                    "id":file_id,
                    "status": "Failed",
                    "message": str(result.result),
                    "transcript": ""
                },
                status_code=500,
            )
        
        return JSONResponse(
            content={
                "id":file_id, 
                "status": f"Unknown state: {state}",
                "message": "",
                "transcript": ""
            },
            status_code=400
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while retrieving the task: {e}"
        ) from e



@router.post("/text/{file_id}", tags=["audio"])
async def submit_correct_text(
    file_id: str,
    txt: str,
):
    """
    Submits the corrected text for a given file ID, triggers text update task, 
    and starts a text-to-speech conversion task.

    - Updates the transcript using the corrected text.
    - Initiates a text-to-speech task based on the corrected text.
    """
    try:
        update_transcript.delay(file_id, txt)
        task = celery_app.send_task("text_to_speech", args=[file_id, txt])

        return JSONResponse(
            content = {"task_id":task.id, "file_id":file_id, "status_url": f"/enhance-audio/audio/{file_id}"},
            status_code=202
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while submitting the corrected text: {e}"
        ) from e



@router.get("/audio/{file_id}", tags=["audio"])
async def get_enhanced_audio(file_id: str, task_id: str=Query()):
    """
    Retrieves the enhanced audio file once the processing task has completed.

    - Monitors the task state to determine whether it's still processing, succeeded, or failed.
    - If successful, streams the processed audio file from MinIO.
    """
    try:
        result = AsyncResult(task_id, app=celery_app)
        state = result.state

        if state == "PENDING":
            return JSONResponse(
                content={"id":task_id, "status": "Processing"},
                status_code=202
            )
        
        if state == "SUCCESS":
            file = get_file(file_id, stage="processed")
            return StreamingResponse(
                BytesIO(file),
                media_type="audio/x-wav", 
                status_code=200
            )
        
        if state == "FAILURE":
            return JSONResponse(
                content={
                    "id":task_id,
                    "status": "Failed",
                    "message": str(result.result)
                },
                status_code=500,
            )
        
        return JSONResponse(
            content={"id": task_id, "status": f"Unknown state: {state}"},
            status_code=400
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while retrieving the task: {e}"
        ) from e


