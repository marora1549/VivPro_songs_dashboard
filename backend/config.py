import os


class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./songs.db")
    JSON_FILE_PATH = os.getenv("JSON_FILE_PATH", "songs_data.json")
