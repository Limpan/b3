from bytardag import models, schemas
from bytardag.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/sheets",
    tags=["sheets"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=schemas.Sheet)
def create_sheet(sheet: schemas.SheetCreate, db: Session = Depends(get_db)):
    db_sheet = models.Sheet(name=sheet.name)
    db_sheet.rows = [models.Row(seller=row.seller, amount=row.amount) for row in sheet.rows]

    db.add(db_sheet)
    db.commit()
    db.refresh(db_sheet)
    return db_sheet

@router.get("/", response_model=list[schemas.Sheet])
def read_sheets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sheets = db.query(models.Sheet).offset(skip).limit(limit).all()
    return sheets


@router.get("/{sheet_id}", response_model=schemas.Sheet)
def read_sheet(sheet_id, db: Session = Depends(get_db)):
    sheet = db.query(models.Sheet).filter_by(id=sheet_id).first()
    return sheet