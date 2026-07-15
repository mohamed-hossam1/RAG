from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Chatbot Backend",
    description="FastAPI Backend for the Next.js Chatbot",
    version="0.1.0"
)

# Configure CORS
# Allow requests from Next.js frontend running locally
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Welcome to the Chatbot API!"
    }
