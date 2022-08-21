from fastapi import FastAPI, Request, WebSocket, Form, Depends, Body
from calculate import tokenize_and_calculate
from training.src.model import SentimentClassifier
import torch
from transformers import AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware
import json
from random import randint

#database imports
from database.schema import Result
from database.model import PredictionResults
from database.database import SessionLocal, engine
import database.model as database_model
from sqlalchemy.orm import Session
from uuid import uuid4



database_model.Base.metadata.create_all(bind=engine)

def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

model = SentimentClassifier()
model.load_state_dict(torch.load("model/model (2).pt", map_location = "cpu"))
tokenizer = AutoTokenizer.from_pretrained('dbmdz/bert-base-turkish-cased')


app = FastAPI()


origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)




@app.get("/")
async def root(request: Request):  
    return {"hoşgeldin gülüm"}


# Randomly generate an input from test set
@app.get("/random_input")
async def random_input():
    f = open("./test_inputs.json")
    data = json.load(f)

    index = randint(0,len(data))

    return data[index]



# Get all past results
@app.get("/past_results")
async def get_past_results(db: Session = Depends(get_database_session)):
    results = db.query(PredictionResults).all()
    return results


# Get a specific past results
@app.post("/result")
async def get_result(payload=Body(...), db: Session = Depends(get_database_session)):
    name = payload["id"]
    item = db.query(PredictionResults).filter(PredictionResults.id==name).first()
    return item


@app.delete("/delete_all")
async def delete_all_results(db: Session = Depends(get_database_session)):
    number = db.query(PredictionResults).delete()
    db.commit()
    print("{} number of rows are deleted from database...".format(number))


# Deleting a specifiv result
@app.delete("/delete_result")
async def delete_result(id: str, db: Session = Depends(get_database_session)):
    result = db.query(PredictionResults).get(id)
    db.delete(result)
    db.commit()
    print("result that has id: {} is deleted...".format(id))



# Calculate the input and make a label prediction // adding new prediction to database
@app.post("/calculate")
async def calculate(data: str = Form() ,db: Session = Depends(get_database_session)):

    prediction, props = tokenize_and_calculate(data,model,tokenizer)


    labels = {
        0 : "Bilim Teknoloji",
        1 : "Dünya",
        2 : "Eğitim",
        3 : "Ekonomi",
        4 : "Kültür Sanat",
        5 : "Sağlık",
        6 : "Spor"
    }


    #find greatest 3 probability
    achieved = 0
    passed_here = []
    probabilities = []
    while(achieved != 3):
        max = -1
        max_index = None
        for i in range(len(props)):
            if i in passed_here:
                continue
            if float(props[i]) > max:
                max = props[i]
                max_index = i
        achieved += 1
        probabilities.append({max*100: labels[max_index]})
        passed_here.append(max_index)
        # print(labels[max_index])

    name = str(uuid4())
    print("New prediction is made, created id: ", name, "  Saving to database...")

    print(list(probabilities[0].keys())[0])

    newResult = PredictionResults(
        id=name,
        input=data,
        resultFirst=list(probabilities[0].keys())[0],
        resultSecond=list(probabilities[1].keys())[0],
        resultThird=list(probabilities[2].keys())[0],
        labelFirst = list(probabilities[0].values())[0],
        labelSecond = list(probabilities[1].values())[0],
        labelThird = list(probabilities[2].values())[0],
    )

    db.add(newResult) # Adding current prediction to database
    db.commit()

    return probabilities
