from ..db.models import RawAudio, ProcessedAudio
from sqlalchemy.orm import Session


def save_table(metadata:dict, db:Session, table:str):
    try:
        if table == "raw":
            record = RawAudio(**metadata)
        elif table =="processed":
            record = ProcessedAudio(**metadata)

        db.add(record)
        db.commit()
        db.refresh(record)

    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Failed to save data in database: {e}") from e



def update_table(id: str, text: str, db: Session):
    try:
        record = db.query(RawAudio).filter_by(id=id).first()
        if record:
            record.transcript = text
            db.commit()

        else:
            raise ValueError(f"Record with ID {id} not found.")
        
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Failed to update the record in the 'RawAudio' table: {e}") from e
    


def read_table(id: str, db: Session, table: str):
    try:
        if table == "raw":
            record = db.query(RawAudio).filter_by(id=id).first()

        elif table =="processed":
           record = db.query(ProcessedAudio).filter_by(id=id).first()

        return record.as_dict()
    
    except Exception as e:
        raise RuntimeError(f"Failed to read data from '{table}' table:  {e}") from e