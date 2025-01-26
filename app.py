from fastapi import FastAPI
from backend.api import activities
from backend.api import chat

app = FastAPI()

app.include_router(activities.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
