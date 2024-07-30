from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...database import get_db
from ...services.song_service import get_songs, get_songs_by_title, update_song_rating
from ...models import Song
from ...schemas import SongRating

router = APIRouter()


@router.get("/songs/")
def read_songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        songs = get_songs(db, skip=skip, limit=limit)
        return {
            "success": True,
            "status_code": 200,
            "message": "Songs fetched successfully",
            "data": [song.__dict__ for song in songs],
            "columns": [column.name for column in Song.__table__.columns]
        }
    except Exception as e:
        return {
            "success": False,
            "status_code": 500,
            "message": str(e),
            "data": [],
            "columns": [column.name for column in Song.__table__.columns]
        }


@router.get("/songs/{title}")
def read_songs_by_title(title: str, db: Session = Depends(get_db)):
    try:
        songs = get_songs_by_title(db, title=title)
        if not songs:
            return {
                "success": False,
                "status_code": 404,
                "message": "No songs found with the given title",
                "data": None,
                "columns": [column.name for column in Song.__table__.columns]
            }
        return {
            "success": True,
            "status_code": 200,
            "message": "Songs fetched successfully",
            "data": [song.__dict__ for song in songs],
            "columns": [column.name for column in Song.__table__.columns]
        }
    except Exception as e:
        return {
            "success": False,
            "status_code": 500,
            "message": str(e),
            "data": None,
            "columns": [column.name for column in Song.__table__.columns]
        }


@router.put("/songs/{song_id}/rate")
def rate_song(song_id: str, rating: SongRating, db: Session = Depends(get_db)):
    try:
        updated_song = update_song_rating(db, song_id=song_id, star_rating=rating.star_rating)
        if updated_song is None:
            return {
                "success": False,
                "status_code": 404,
                "message": "Song not found",
                "data": None,
                "columns": [column.name for column in Song.__table__.columns]
            }
        return {
            "success": True,
            "status_code": 200,
            "message": "Song rating updated successfully",
            "data": updated_song.__dict__,
            "columns": [column.name for column in Song.__table__.columns]
        }
    except Exception as e:
        return {
            "success": False,
            "status_code": 500,
            "message": str(e),
            "data": None,
            "columns": [column.name for column in Song.__table__.columns]
        }
