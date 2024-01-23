import pendulum
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base


class Sheet(Base):
    __tablename__ = "sheets"

    id = Column(Integer(), primary_key=True)
    timestamp = Column(DateTime, index=True, default=pendulum.now)
    name = Column(String(4), index=True)
    closed = Column(DateTime, index=True, default=None)

    rows = relationship("Row", backref="sheet", lazy="dynamic")

    def __repr__(self):
        return "<Sheet {}>".format(self.id)


class Row(Base):
    __tablename__ = "rows"

    id = Column(Integer(), primary_key=True)
    timestamp = Column(DateTime, index=True, default=pendulum.now)
    seller = Column(String(4), index=True)
    amount = Column(Integer())

    sheet_id = Column(Integer(), ForeignKey("sheets.id"))

    def __repr__(self):
        return "<Row {}>".format(self.id)
