from bytardag.database import get_db
from fastapi import APIRouter, Depends
from bytardag import models, schemas
from sqlalchemy.orm import Session

router = APIRouter(
        prefix="/sellers",
    tags=["sellers"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/sellers/", response_model=list[schemas.Row])#, dependencies=[Depends(validate_token)])
def read_sellers(skip = 0, limit: int = 100, db: Session = Depends(get_db)):
    sellers = db.query(models.Seller).offset(skip).limit(limit).all()
    return sellers
