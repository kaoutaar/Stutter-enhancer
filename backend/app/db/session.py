from sqlalchemy import create_engine
from sqlalchemy.orm import session
import tempfile



temp_dir = tempfile.TemporaryDirectory()

# Format: dialect+driver://username:password@host:port/database
# dialect:///database 
# driver and username and password and host:port are omitted
# dialect=sqlite
# database=tmp/text.db

SQLALCHEMY_DATABASE_URL = f"sqlite:///{temp_dir.name}/test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = session(bind = engine, autocommit=False, autoflush=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()