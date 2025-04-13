from pydantic import BaseModel


class TranscriptIn(BaseModel):
    id: str
    content: str

class TranscriptOut(TranscriptIn):
    id: str
    status: str
    message: str
    transcript: str