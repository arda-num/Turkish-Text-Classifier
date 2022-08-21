from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = f"mysql+mysqlconnector://root:{os.getenv('MYSQL_ROOT_PASSWORD')}@database:3306/{os.getenv('MYSQL_DATABASE')}"

engine = create_engine(
    DATABASE_URL
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


