from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import calculator, scientific, financial, history
from app.models.database import init_db

app = FastAPI(title="Calculator API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(calculator.router, prefix="/api/calculator", tags=["calculator"])
app.include_router(scientific.router, prefix="/api/scientific", tags=["scientific"])
app.include_router(financial.router, prefix="/api/financial", tags=["financial"])
app.include_router(history.router, prefix="/api/history", tags=["history"])

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/")
async def root():
    return {"message": "Calculator API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
