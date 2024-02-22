import pendulum
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer(), primary_key=True)
    event_start = Column(DateTime())
    event_end = Column(DateTime())
    signup_start = Column(DateTime())
    signup_end = Column(DateTime())
    active = Column(Boolean(), default=False)
    next_sheet_id = Column(Integer(), default=0)

    seats = relationship("Seat", backref="event", lazy="dynamic")

    def __repr__(self):
        return "<Event {} ({})>".format(self.id, self.event_start)


class Seat(Base):
    __tablename__ = "seats"

    id = Column(Integer(), primary_key=True)
    

    event_id = Column(Integer(), ForeignKey("events.id"))

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
