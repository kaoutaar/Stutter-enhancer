from sqlalchemy import Column, String, Float, Integer, DateTime
from .base import Base


class RawAudio(Base):
    __tablename__ = 'raw_audio'
    row_id = Column(Integer, primary_key=True, index=True)
    id = Column(String(255), index=True)  
    transcript = Column(String(2000), default="")  
    length = Column(Float, index=True)
    format = Column(String(50), index=True)
    size = Column(Float, index=True)
    created_time = Column(DateTime, index=True)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns if getattr(self, column.name) is not None} 


class ProcessedAudio(Base):
    __tablename__ = 'processed_audio'
    row_id = Column(Integer, primary_key=True, index=True)
    id = Column(String(255), index=True)
    length = Column(Float, index=True)
    format = Column(String(50), index=True)
    size = Column(Float, index=True)
    created_time = Column(DateTime, index=True)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns if getattr(self, column.name) is not None}