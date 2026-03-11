import os

class Config:
    PROJECT_NAME = "Encryption Web Engine"
    VERSION = "1.0.0"
    API_V1_STR = "/api/v1"
    
    # 1MB size limit max for payloads
    MAX_REQUEST_SIZE = 1 * 1024 * 1024
    
    # Simple in-memory rate limiting default configurations
    RATE_LIMIT_REQUESTS = 100
    RATE_LIMIT_WINDOW = 60 # seconds
    
    # CORS
    BACKEND_CORS_ORIGINS = os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    
    DEBUG = True

settings = Config()
