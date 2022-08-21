from fastapi import FastAPI, Request, WebSocket
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.templating import Jinja2Templates
from calculate import tokenize_and_calculate
from training.src.model import SentimentClassifier
import torch
from transformers import AutoTokenizer


model = SentimentClassifier()
model.load_state_dict(torch.load("model/model (2).pt", map_location = "cpu"))
tokenizer = AutoTokenizer.from_pretrained('dbmdz/bert-base-turkish-cased')




app = FastAPI()
app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent.absolute() / "./static"),
    name="static",
)

templates = Jinja2Templates(directory="templates")


@app.get("/")
async def root(request: Request):  
    return templates.TemplateResponse("index.html", {"request":request})


@app.websocket("/calculate")
async def websocket_endpoint(websocket: WebSocket):
    

    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        
        prediction, probabilities = tokenize_and_calculate(data,model,tokenizer)

        probabilities = {
            "bilim_teknoloji": str("%.2f" % (probabilities[0]*100)),
            "dunya": str("%.2f" % (probabilities[1]*100)),
            "egitim": str("%.2f" % (probabilities[2]*100)),
            "ekonomi": str("%.2f" % (probabilities[3]*100)),
            "kultur_sanat": str("%.2f" % (probabilities[4]*100)),
            "saglik": str("%.2f" % (probabilities[5]*100)),
            "spor": str("%.2f" % (probabilities[6]*100)),
        }

        await websocket.send_json(
            probabilities
        )
