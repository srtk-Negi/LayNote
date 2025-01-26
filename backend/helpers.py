"""Helper functions for the API."""


def validate_required(**kwargs) -> None:
    """Validate that required values are present.

    Args:
        **kwargs: The values to validate.

    Raises:
        ValueError: If a required value is missing.
    """
    for key, val in kwargs.items():
        if not val:
            raise ValueError(f"Missing required value: {key}")
