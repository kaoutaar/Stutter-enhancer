from pydantic import BaseModel, Field
from datetime import datetime

class AudioIn(BaseModel):
    length : float = Field(gt=0)
    format : str
    size : float = Field(gt=0)
    created_time : datetime

class AudioOut(AudioIn):
    id : str   
    pass

