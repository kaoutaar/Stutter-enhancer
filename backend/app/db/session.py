from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from dotenv import load_dotenv
import os


load_dotenv("./deploymnent/.env")

username = os.getenv("DBUSER")
password = os.getenv("DBPASSWORD")
url = os.getenv("DBURL")
db = os.getenv("DB")

# Format: dialect+driver://username:password@host:port/database
DB_URL = f"postgresql://{username}:{password}@{url}/{db}"
engine = create_engine(DB_URL, echo=True)

SessionLocal = sessionmaker(bind = engine, autocommit=False, autoflush=False)

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()