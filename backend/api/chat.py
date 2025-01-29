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
    activityType = data.get("activityType")
    airport = data.get("airport")
    atmosphere = data.get("atmosphere")
    energy = data.get("energy")
    freeResponse = data.get("freeResponse")

    activities = f"{activityType} {atmosphere} {energy} {freeResponse}"

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

    print(tweaks)

    response = client.run_flow(input_type="chat", tweaks=tweaks, output_type="chat")
    return response
