from sqlalchemy import Table, Column, Integer, String, MetaData

from backend.engine import db_engine

metadata = MetaData()


users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("email", String(50)),
    Column("password", String(50)),
)


metadata.create_all(db_engine)
