from pydantic import BaseModel


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
    name: str


class SheetCreate(SheetBase):
    rows: list[RowCreate]


class Sheet(SheetBase):
    id: int
    rows: list[Row]

    class Config:
        from_attributes = True
