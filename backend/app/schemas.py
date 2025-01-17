from pydantic import BaseModel


class SongBase(BaseModel):
    id: str
    title: str
    danceability: float
    energy: float
    key: int
    loudness: float
    mode: int
    acousticness: float
    instrumentalness: float
    liveness: float
    valence: float
    tempo: float
    duration_ms: int
    time_signature: int
    num_bars: int
    num_sections: int
    num_segments: int
    class_: int


class Song(SongBase):
    star_rating: int

    class Config:
        orm_mode = True


class SongRating(BaseModel):
    star_rating: int
