from fastapi import APIRouter, HTTPException
from schemas.chat import ChatRequest, ChatResponse
from services.llm import generate_chat_response

router = APIRouter(
    prefix="/api",
    tags=["chat"]
)

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages list cannot be empty.")
    
    return await generate_chat_response(request)

@router.get("/", response_model=ChatResponse)
async def root():
    return {
        "message": "Welcome to the Chatbot API!"
    }
