from bytardag.database import get_db
from fastapi import APIRouter, Depends
from bytardag import models, schemas
from sqlalchemy.orm import Session

router = APIRouter(
        prefix="/events",
    tags=["events"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/events/", response_model=list[schemas.Event])#, dependencies=[Depends(validate_token)])
def read_events(skip = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = db.query(models.Event).offset(skip).limit(limit).all()
    return events

@router.get("/events/active", response_model=schemas.Event)
def read_active_event(db: Session = Depends(get_db)):
    event = db.query(models.Event).filter_by(active = True).first()
    return event
