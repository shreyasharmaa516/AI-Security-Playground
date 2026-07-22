from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Sentra"
    app_version: str = "1.0.0"
    debug: bool = True


settings = Settings()
