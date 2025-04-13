from sqlalchemy import Column, String, Float, Integer, DateTime
from .base import Base


class RawAudio(Base):
    row_id = Column(Integer, primary_key=True, index=True)
    id = Column(String, index=True)
    transcript = Column(String, default="")
    length = Column(Float, index=True)
    format = Column(String, index=True)
    size = Column(Float, index=True)
    created_time = Column(DateTime, index=True)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns if getattr(self, column.name) is not None} 


class ProcessedAudio(Base):
    row_id = Column(Integer, primary_key=True, index=True)
    id = Column(String, index=True)
    length = Column(Float, index=True)
    format = Column(String, index=True)
    size = Column(Float, index=True)
    created_time = Column(DateTime, index=True)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns if getattr(self, column.name) is not None}
