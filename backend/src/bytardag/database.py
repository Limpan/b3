from bytardag.config import Config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine = create_engine(
    Config.SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": not Config.SQLALCHEMY_DATABASE_URL.startswith('sqlite://')}  # check_same_thread for SQLite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
