from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
from src.api.routes import router as api_router
import os

app = FastAPI(title="LeadGen AI", description="AI-Powered Lead Generation Tool")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the React frontend
app.mount("/", StaticFiles(directory="frontend/build", html=True), name="frontend")

# Include API routes
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    # Run the application
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 