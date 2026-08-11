from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    company: Mapped[str] = mapped_column(String(150))
    job_title: Mapped[str] = mapped_column(String(150))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    address: Mapped[str] = mapped_column(String(255))
    city: Mapped[str] = mapped_column(String(100))
    county: Mapped[str] = mapped_column(String(100))
    brand_color: Mapped[str] = mapped_column(String(7))
