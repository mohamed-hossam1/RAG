import os
from dotenv import load_dotenv
from openai import OpenAI
from fastapi import HTTPException
from schemas.chat import ChatRequest, ChatResponse, Message

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../.env"))

def get_openai_client(base_url: str, api_key_name: str) -> OpenAI:
    api_key = os.getenv(api_key_name)
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail=f"API Key '{api_key_name}' is not configured on the server."
        )
    return OpenAI(api_key=api_key, base_url=base_url)

def safe_chat_completion(client: OpenAI, **kwargs):
    try:
        return client.chat.completions.create(**kwargs)
    except Exception as e:
        err_msg = str(e).lower()
        if "reasoning_effort" in err_msg or "reasoning" in err_msg:
            kwargs.pop("reasoning_effort", None)
            return client.chat.completions.create(**kwargs)
        raise e

async def generate_chat_response(request: ChatRequest) -> ChatResponse:
    messages_payload = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    
    try:
        if request.provider == "google":
            client = get_openai_client(
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
                api_key_name="GOOGLE_API_KEY"
            )
            model_name = "gemini-3.5-flash"
            
            response = safe_chat_completion(
                client=client,
                model=model_name,
                messages=messages_payload,
                temperature=request.temperature,
                max_tokens=1024,
                reasoning_effort="minimal"
            )
            
        elif request.provider == "groq":
            client = get_openai_client(
                base_url="https://api.groq.com/openai/v1",
                api_key_name="GROQ_API_KEY"
            )
            model_name = "llama-3.3-70b-versatile"
            
            response = safe_chat_completion(
                client=client,
                model=model_name,
                messages=messages_payload,
                temperature=request.temperature,
                max_tokens=1024,
                reasoning_effort="minimal"
            )
            
        elif request.provider == "inference":
            client = get_openai_client(
                base_url="https://inference.dahl.global/v1",
                api_key_name="INFERENCE_API_KEY"
            )
            model_name = "MiniMaxAI/MiniMax-M2.7"
            
            response = safe_chat_completion(
                client=client,
                model=model_name,
                messages=messages_payload,
                temperature=request.temperature,
                reasoning_effort="minimal"
            )
            
        else:
            raise HTTPException(status_code=400, detail="Invalid LLM provider specified.")

        assistant_message = Message(
            role="assistant",
            content=response.choices[0].message.content or ""
        )
        
        return ChatResponse(
            message=assistant_message,
            provider=request.provider,
            model=model_name
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with LLM Provider ({request.provider}): {str(e)}"
        )
