import requests
from dotenv import load_dotenv
import json
import os

load_dotenv()

api_key = os.getenv("API_KEY")


def main():
    url = "https://us1.locationiq.com/v1/nearby"
    response = requests.get("https://ipinfo.io/json")
    data = response.json()

    print(data)

    # data = {
    #     "key": api_key,
    #     "lat": "30.6110",
    #     "lon": "-96.3491",
    #     "tag": "restaurant",
    #     "radius": 1000,
    #     "format": "json",
    # }

    # response = requests.get(url, params=data)

    # if response.status_code == 200:
    #     with open("res.json", "w") as f:
    #         json.dump(response.json(), f, indent=4)
    # else:
    #     print("Error")


if __name__ == "__main__":
    main()
