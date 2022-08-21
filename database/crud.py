from sqlalchemy.orm import Session
from . import model, schema


def get_training_session(db: Session, result_id: str):
    return db.query(model.PredictionResults).filter_by(id=result_id).first()


