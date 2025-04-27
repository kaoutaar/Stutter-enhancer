# setup_db.py
import sys
sys.path.append(".")
from app.db.base import Base
from app.db.session import engine
from sqlalchemy import inspect
from app.db.models import *


inspector = inspect(engine)

# Get all table names
tables = inspector.get_table_names()
if not tables:
    try:
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error during table creation: {e}")

tables = inspector.get_table_names()
for table in tables:
    print(f" - {table}")