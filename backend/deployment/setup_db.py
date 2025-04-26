# setup_db.py
import sys
sys.path.append(".")
from app.db.base import Base
from app.db.session import engine

# Create tables 1:1
Base.metadata.create_all(bind=engine)