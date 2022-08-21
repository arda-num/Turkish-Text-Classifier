from datetime import date
from pydantic import BaseModel


class Result(BaseModel):
    id = int
    input = str
    result0 = float
    result1 = float
    result2 = float
    result3 = float
    result4 = float
    result5 = float
    result6 = float
    

    class Config:
        orm_mode = True