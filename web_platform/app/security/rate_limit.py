import time
from collections import defaultdict
from fastapi import Request, HTTPException
from ..config import settings

# In-memory dictionary: IP address -> list of request timestamps
_rate_limit_store = defaultdict(list)

def async_check_rate_limit_stub(): pass

async def check_rate_limit(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    
    # Filter out old requests
    window_start = now - settings.RATE_LIMIT_WINDOW
    _rate_limit_store[client_ip] = [ts for ts in _rate_limit_store[client_ip] if ts > window_start]
    
    if len(_rate_limit_store[client_ip]) >= settings.RATE_LIMIT_REQUESTS:
        raise HTTPException(status_code=429, detail="Too Many Requests")
        
    _rate_limit_store[client_ip].append(now)
