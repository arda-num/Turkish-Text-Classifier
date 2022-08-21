from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text, Float
from sqlalchemy import DateTime
from .database import Base
from sqlalchemy.sql import func

from .schema import *



class PredictionResults(Base):
    __tablename__ = "PredictionResults"
    id = Column(String(36), primary_key=True)
    input = Column(Text())
    resultFirst = Column(Float())
    resultSecond = Column(Float())
    resultThird = Column(Float())
    labelFirst = Column(Text())
    labelSecond = Column(Text())
    labelThird = Column(Text())
    time_created = Column(DateTime(timezone=True), server_default=func.now())


