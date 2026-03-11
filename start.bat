@echo off
title Encryption Web Platform Starter
echo ===================================================
echo Starting Antigravity Encryption Web Platform
echo ===================================================

echo.
echo [1/2] Starting Python FastAPI Backend on Port 8001...
start "Backend API (Port 8001)" cmd /k "uvicorn web_platform.app.main:app --port 8001"

echo [2/2] Starting Next.js Frontend on Port 3000...
cd web_platform\frontend
start "Frontend UI (Port 3000)" cmd /k "npm run dev"

echo.
echo Both servers are launching in separate background windows!
echo Once the Next.js server is ready, open http://localhost:3000 in your browser.
echo You can close this launcher window now.
pause
