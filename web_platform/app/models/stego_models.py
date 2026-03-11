from pydantic import BaseModel
from typing import Optional

class StegoResponse(BaseModel):
    success: bool
    result: Optional[str] = None
    error: Optional[str] = None
    
# NOTE: The StegoRequest model is implemented implicitly in the endpoints using FastAPI's Form(...) and File(...) dependencies
# because Pydantic models natively struggle with handling multipart/form-data encompassing both large files and JSON fields elegantly.
