from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .security.middleware import SecurityMiddleware
from .routes import crypto_routes, stego_routes

# Create FastAPI application instance cleanly
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG, # Enforce debug disabled
    description="Stateless Backend API for the Legacy Encryption Engine"
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom security middleware (includes global exception handling and payload limits)
app.add_middleware(SecurityMiddleware)

# Include Routers cleanly
app.include_router(crypto_routes.router, prefix=settings.API_V1_STR)
app.include_router(stego_routes.router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Encryption Engine API Running"}
