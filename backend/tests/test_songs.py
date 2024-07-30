import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..app.main import app
from ..app.database import Base, get_db
from ..app.models import Song

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_read_songs():
    response = client.get("/api/songs/")
    assert response.status_code == 200
    assert response.json()["success"] == True
    assert "data" in response.json()


def test_read_songs_by_title():
    # Add a test song to the database
    db = TestingSessionLocal()
    test_song = Song(id="test_id", title="Test Song", danceability=0.5)
    db.add(test_song)
    db.commit()

    response = client.get("/api/songs/Test Song")
    assert response.status_code == 200
    assert response.json()["success"] == True
    assert response.json()["data"][0]["title"] == "Test Song"


def test_rate_song():
    # Add a test song to the database
    db = TestingSessionLocal()
    test_song = Song(id="test_rate_id", title="Test Rate Song", danceability=0.5)
    db.add(test_song)
    db.commit()

    response = client.put("/api/songs/test_rate_id/rate", json={"star_rating": 5})
    assert response.status_code == 200
    assert response.json()["success"] == True
    assert response.json()["data"]["star_rating"] == 5


def test_read_nonexistent_song():
    response = client.get("/api/songs/Nonexistent Song")
    assert response.status_code == 404
    assert response.json()["success"] == False


def test_rate_nonexistent_song():
    response = client.put("/api/songs/nonexistent_id/rate", json={"star_rating": 5})
    assert response.status_code == 404
    assert response.json()["success"] == False
