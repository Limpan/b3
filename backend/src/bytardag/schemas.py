from datetime import datetime
from pydantic import BaseModel


class EventBase(BaseModel):
    event_start: datetime
    event_end: datetime
    signup_start: datetime
    signup_end: datetime


class Event(EventBase):
    id: int

    class Config:
        from_attributes = True


class RowBase(BaseModel):
    seller: str
    amount: int


class RowCreate(RowBase):
    pass


class Row(RowBase):
    id: int
    
    class Config:
        from_attributes = True


class SheetBase(BaseModel):
    pass

class SheetCreate(SheetBase):
    rows: list[RowCreate]


class Sheet(SheetBase):
    id: int
    name: str
    rows: list[Row]

    class Config:
        from_attributes = True
