from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from dotenv import load_dotenv
import os


load_dotenv("./deployment/.env")

DBURL = os.getenv("DBURL")
DB_USER = os.getenv("POSTGRESQL_USERNAME")
DB_PASSWORD = os.getenv("POSTGRESQL_PASSWORD")
DB_NAME = os.getenv("POSTGRESQL_DATABASE")
# Format: dialect+driver://username:password@host:port/database
DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DBURL}/{DB_NAME}"

engine = create_engine(DB_URL, echo=True)

SessionLocal = sessionmaker(bind = engine, autocommit=False, autoflush=False)

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()