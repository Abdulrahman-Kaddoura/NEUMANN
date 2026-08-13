from typing import Literal

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

Company = Literal[
    "Benton",
    "Chanay",
    "Chemel",
    "Feltz Printing",
    "Commercial Press",
    "Yummy",
]


class EmployeeOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    company: str
    job_title: str
    email: str | None
    address: str
    city: str
    county: str
    brand_color: str

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True,
    )


class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    company: Company
    job_title: str
    email: str | None = None
    address: str
    city: str
    county: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class EmployeeUpdate(EmployeeCreate):
    pass
