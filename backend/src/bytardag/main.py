from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from . import models, schemas
from bytardag.database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/rows/", response_model=schemas.Row)
def create_row(row: schemas.RowCreate, db: Session = Depends(get_db)):
    db_row = models.Row(seller=row.seller, amount=row.amount)
    db.add(db_row)
    db.commit()
    db.refresh(db_row)
    return db_row


@app.get("/rows/", response_model=list[schemas.Row])
def read_rows(skip = 0, limit: int = 100, db: Session = Depends(get_db)):
    rows = db.query(models.Row).offset(skip).limit(limit).all()
    return rows


# @app.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return crud.create_user(db=db, user=user)


# @app.get("/users/", response_model=list[schemas.User])
# def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users


# @app.get("/users/{user_id}", response_model=schemas.User)
# def read_user(user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user