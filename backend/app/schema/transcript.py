from pydantic import BaseModel


class TranscriptIn(BaseModel):
    id: str
    content: str

class TranscriptOut(BaseModel):
    id: str
    status: str
    message: str
    transcript: str