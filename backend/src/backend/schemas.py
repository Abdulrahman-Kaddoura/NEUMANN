from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr
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
    email: EmailStr | None
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
    email: EmailStr | None = None
    address: str
    city: str
    county: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class EmployeeUpdate(EmployeeCreate):
    pass


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal["editor", "viewer"]

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str

    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True,
    )


class UserListOut(BaseModel):
    items: list[UserOut]

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )


class EmployeeListOut(BaseModel):
    items: list[EmployeeOut]
    total: int
    page: int
    page_size: int

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )
