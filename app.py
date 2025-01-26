from fastapi import FastAPI
from backend.api import activities

app = FastAPI()

app.include_router(activities.router, prefix="/api")
