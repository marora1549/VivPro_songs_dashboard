import json
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func
from ..models import Song
from config import Config


def normalize_json_data(json_file_path):
    try:
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        normalized_data = []
        for i in range(len(data['id'])):
            song = {attr: data[attr][str(i)] for attr in data.keys()}
            normalized_data.append(song)

        return normalized_data
    except FileNotFoundError:
        print(f"Error: JSON file not found at {json_file_path}")
        return []
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in file {json_file_path}")
        return []


def import_songs_to_db(db: Session):
    normalized_data = normalize_json_data(Config.JSON_FILE_PATH)
    for song_data in normalized_data:
        try:
            db_song = Song(**song_data)
            db.add(db_song)
            db.commit()
        except IntegrityError:
            db.rollback()
            print(f"Duplicate song ID found: {song_data['id']}. Skipping.")
        except Exception as e:
            db.rollback()
            print(f"Error inserting song: {e}")


def get_songs(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(Song).offset(skip).limit(limit).all()
    except Exception as e:
        print(f"Error fetching songs: {e}")
        return []


def get_songs_by_title(db: Session, title: str):
    try:
        return db.query(Song).filter(Song.title.ilike(title)).all()
    except Exception as e:
        print(f"Error fetching songs by title: {e}")
        return []


def update_song_rating(db: Session, song_id: str, star_rating: int):
    try:
        db_song = db.query(Song).filter(Song.id == song_id).first()
        if db_song:
            db_song.star_rating = star_rating
            db.commit()
            db.refresh(db_song)
        return db_song
    except Exception as e:
        db.rollback()
        print(f"Error updating song rating: {e}")
        raise