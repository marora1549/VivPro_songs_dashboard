from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.endpoints import songs
from .database import engine
from . import models
from .services.song_service import import_songs_to_db
from .database import SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(songs.router, prefix="/api", tags=["songs"])


@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    import_songs_to_db(db)
    db.close()
