"""Contains the database connection logic."""

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine

from .helpers import validate_required

load_dotenv()

SERVER = os.environ.get("SERVER")
DATABASE = os.environ.get("DATABASE")
USERNAME = os.environ.get("USERNAME")
PASSWORD = os.environ.get("PASSWORD")

try:
    validate_required(
        SERVER=SERVER, DATABASE=DATABASE, USERNAME=USERNAME, PASSWORD=PASSWORD
    )
except Exception as e:
    print(f"Error validating environment variables: {e}")
    raise e

try:
    db_engine = create_engine(
        f"mysql+mysqlconnector://{USERNAME}:{PASSWORD}@{SERVER}/{DATABASE}"
    )
except Exception as e:
    print(f"Error connecting to database: {e}")
    raise e
