import requests
from dotenv import load_dotenv
import json
import os

load_dotenv()

api_key = os.getenv("API_KEY")


def main():
    url = "https://us1.locationiq.com/v1/nearby"

    data = {
        "key": api_key,
        "lat": "-37.870983",
        "lon": "144.980714",
        "tag": "restaurant",
        "radius": 100,
        "format": "json",
    }

    response = requests.get(url, params=data)

    if response.status_code == 200:
        with open("res.json", "w") as f:
            json.dump(response.json(), f, indent=4)
    else:
        print("Error")


if __name__ == "__main__":
    main()
