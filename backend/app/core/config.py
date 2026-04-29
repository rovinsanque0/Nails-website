from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    mail_username: str
    mail_password: str
    mail_from: str
    mail_to: str

    allowed_origins: str = "http://localhost:5173"

    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str

    model_config = {"env_file": ".env"}

settings = Settings()
