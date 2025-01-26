from .client import LangflowClient
from fastapi import APIRouter, Request
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()
flow_id = os.getenv("FLOW_ID")


@router.post("/chat")
async def chat(request: Request):
    """Chat with the flow."""
    data = await request.json()
    client = LangflowClient(flow_id)

    duration = data.get("duration")
    activities = data.get("activities")
    airport = data.get("airport")

    tweaks = {
        "TextInput-ByjK1": {
            "input_value": duration,
        },
        "TextInput-xgNDH": {
            "input_value": activities,
        },
        "TextInput-lOCUO": {
            "input_value": airport,
        },
    }

    response = client.run_flow(input_type="chat", tweaks=tweaks, output_type="chat")
    print(response)
    return response
