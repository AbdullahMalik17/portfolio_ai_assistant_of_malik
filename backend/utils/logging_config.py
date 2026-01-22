"""
Logging configuration utilities.
"""
import logging
import sys
from typing import Optional


def setup_logging(level: Optional[str] = None, debug: bool = False) -> None:
    """
    Set up application-wide logging configuration.
    
    Args:
        level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        debug: Enable debug mode (verbose logging)
    """
    log_level = logging.DEBUG if debug else (logging.getLevelName(level) if level else logging.INFO)
    
    logging.basicConfig(
        level=log_level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
        ],
        force=True,  # Override any existing configuration
    )
    
    # Set specific logger levels
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)

