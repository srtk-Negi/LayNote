from langflow.load import get_flow
import requests


class LangflowClient:
    """A client to run a flow using Langflow."""

    def __init__(
        self,
        flow_id: str,
        base_url: str = "http://localhost:7860",
    ):
        """
        Initialize the LangflowClient.

        Args:
            base_url (str): The base URL of the API endpoint. Default is "http://localhost:7860"
            flow_id (str): The ID of the flow
        """
        self.base_url = base_url
        self.flow_id = flow_id

        if not self.flow_id:
            raise ValueError("flow_id is required for api flow run type")

    def __repr__(self):
        return f"LangflowClient(base_url={self.base_url}, flow_id={self.flow_id}, endpoint={self.endpoint}), flow_name={self._get_flow_name()}"

    def __str__(self):
        return f"LangflowClient(base_url={self.base_url}, flow_id={self.flow_id}, endpoint={self.endpoint}), flow_name={self._get_flow_name()}"

    def _get_flow_name(self) -> str:
        """
        Get the name of the flow.

        Returns:
            str: The name of the flow
        """
        flow_data = get_flow(self.base_url, self.flow_id)
        try:
            flow_name = flow_data["name"]
            return flow_name
        except KeyError:
            raise ValueError("Invalid flow data")

    def get_flow_data(self) -> dict:
        """Get the flow data.

        Returns:
            dict: The flow data
        """
        return get_flow(self.base_url, self.flow_id)

    def get_all_nodes(self, depth: str = "all") -> list:
        """Get all the nodes in the flow.

        Args:
            depth (str): The depth of the response. Allowed values are "all" and "minimal". Default is "all".

        Returns:
            list: The nodes in the flow
        """
        try:
            flow_data = get_flow(self.base_url, self.flow_id)
        except Exception as e:
            raise Exception(e)

        try:
            if depth == "all":
                nodes = flow_data["data"]["nodes"]
                return nodes
            elif depth == "minimal":
                nodes = flow_data["data"]["nodes"]
                minimal_nodes = [
                    {
                        "id": node["id"],
                        "name": node["data"]["node"]["display_name"],
                        "description": node["data"]["node"]["description"],
                        "field_order": node["data"]["node"]["field_order"],
                    }
                    for node in nodes
                ]
                return minimal_nodes
            else:
                raise ValueError("Invalid depth")
        except KeyError:
            raise ValueError("Invalid flow data")

    def get_tweaks_dict(self) -> dict:
        """Get the tweaks dictionary for the flow.

        **Important**: Remove the tweaks that you do not want to apply/modify from this dictionary before passing it to the `run_flow` method otherwise it will mess up the default values of the flow.

        Returns:
            dict: The tweaks dictionary
        """
        try:
            nodes = self.get_all_nodes("minimal")
        except Exception as e:
            raise Exception(e)

        tweaks = {}

        for node in nodes:
            tweaks[node["id"]] = {}

            for field in node["field_order"]:
                tweaks[node["id"]][field] = ""

        return tweaks

    def upload_file_to_chroma_db(
        self,
        filepath: str,
        collection_name: str,
        persist_directory: str,
        chroma_node_id: str,
        file_node_id: str,
    ):
        """Upload a file to the Chroma database.

        Args:
            filepath (str): The path to the file
            collection_name (str): The name of the collection
            persist_directory (str): The directory to persist the file
            chroma_node_id (str): The ID of the Chroma node
            file_node_id (str): The ID of the File node

        Returns:
            str: The result of the upload
        """
        payload = {
            "tweaks": {
                chroma_node_id: {
                    "collection_name": collection_name,
                    "persist_directory": persist_directory,
                },
                file_node_id: {"path": filepath},
            },
        }

        url = f"{self.base_url}/api/v1/run/{self.flow_id}"

        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)

        return response.json()

    def run_flow(
        self,
        output_type: str,
        input_type: str = "chat",
        input_value: str = "",
        tweaks: dict = None,
    ):
        """Run a flow using Langflow.

        ## Important points to note:

        1. When handling multiple inputs:

           - Do not use any chat input. Only use text inputs.

        2. Using text inputs:

           - Specify `input_type` as `chat` if you want to use `tweaks`.
           - Specify `input_type` as `text` if you want to use `input_value`.

        3. Using chat input:
           - Specify `input_type` as `chat` if you want to use `input_value`.
           - Specify `input_type` as `text` if you want to use `tweaks`.

        Args:
            output_type (str): The type of output data/component
            input_type (str): The type of input data/component
            input_value (str): The input value
            tweaks (dict): The tweaks to apply to the flow

        Returns:
            str: The result of the flow

        Raises:
            ValueError: If the response from the flow is invalid
            ValueError: If the url is required for api flow run type
            ValueError: If the response from the API is invalid
            Exception: If there is an error running the flow
        """
        try:
            result = self._run_flow_from_api(
                url=f"{self.base_url}/api/v1/run/{self.flow_id}",
                input_type=input_type,
                output_type=output_type,
                tweaks=tweaks,
                input_value=input_value,
            )
            return result
        except Exception as e:
            raise Exception(e)

    def _run_flow_from_api(
        self,
        url: str,
        tweaks: dict,
        input_type: str,
        output_type: str,
        input_value: str,
    ) -> str:
        """
        Run a flow from an API endpoint

        Args:
            url (str): The URL of the API endpoint
            input_type (str): The type of input data
            output_type (str): The type of output data
            tweaks (dict): The tweaks to apply to the flow

        Returns:
            str: The result of the flow
        """
        if not url:
            raise ValueError("url is required for api flow run type")

        payload = {
            "input_type": input_type,
            "output_type": output_type,
        }

        if tweaks:
            payload["tweaks"] = tweaks
        else:
            payload["input_value"] = input_value

        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)

        try:
            if output_type == "chat":
                result = response.json()["outputs"][0]["outputs"][0]["results"][
                    "message"
                ]["data"]["text"]
            elif output_type == "text":
                result = response.json()["outputs"][0]["outputs"][0]["results"]["text"][
                    "data"
                ]["text"]
            else:
                raise ValueError("Invalid output_type")
            return result
        except KeyError:
            raise ValueError("Invalid response from API")
        except Exception as e:
            raise Exception(f"Error: {e}")
