from bytardag.database import get_db
from fastapi import APIRouter, Depends
from bytardag import models, schemas
from sqlalchemy.orm import Session

router = APIRouter(
        prefix="/rows",
    tags=["rows"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.post("/rows/", response_model=schemas.Row)#, dependencies=[Depends(validate_token)])
def create_row(row: schemas.RowCreate, db: Session = Depends(get_db)):
    db_row = models.Row(seller=row.seller, amount=row.amount)
    db.add(db_row)
    db.commit()
    db.refresh(db_row)
    return db_row


@router.get("/rows/", response_model=list[schemas.Row])#, dependencies=[Depends(validate_token)])
def read_rows(skip = 0, limit: int = 100, db: Session = Depends(get_db)):
    rows = db.query(models.Row).offset(skip).limit(limit).all()
    return rows