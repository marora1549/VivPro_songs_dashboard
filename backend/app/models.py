from sqlalchemy import Column, Integer, String, Float
from .database import Base


class Song(Base):
    __tablename__ = "songs"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    danceability = Column(Float)
    energy = Column(Float)
    key = Column(Integer)
    loudness = Column(Float)
    mode = Column(Integer)
    acousticness = Column(Float)
    instrumentalness = Column(Float)
    liveness = Column(Float)
    valence = Column(Float)
    tempo = Column(Float)
    duration_ms = Column(Integer)
    time_signature = Column(Integer)
    num_bars = Column(Integer)
    num_sections = Column(Integer)
    num_segments = Column(Integer)
    class_ = Column(Integer)
    star_rating = Column(Integer, default=0)