from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import logging
from ..config import settings

logger = logging.getLogger(__name__)

class SecurityMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Prevent oversized requests
        content_length_str = request.headers.get("content-length")
        if content_length_str:
            try:
                content_length = int(content_length_str)
                if content_length > settings.MAX_REQUEST_SIZE:
                    logger.warning(f"Rejected oversized request: {content_length} bytes")
                    return JSONResponse(
                        status_code=413,
                        content={"detail": "Payload Too Large. Maximum allowed size is 1MB."}
                    )
            except ValueError:
                pass
                
        # Call the next middleware/route handler
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            # Global exception handler for unhandled exceptions
            import traceback
            traceback.print_exc()
            logger.error(f"Unhandled server error: {str(e)}", exc_info=False) # Do not expose stack traces locally!
            return JSONResponse(
                status_code=500,
                content={"detail": "Internal Server Error occurred. Please check your inputs."}
            )
