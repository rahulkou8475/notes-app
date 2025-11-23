from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str
    supabase_service_key: str
    openai_api_key: Optional[str] = None
    environment: str = "development"
    
    class Config:
        env_file = ".env"


settings = Settings()

