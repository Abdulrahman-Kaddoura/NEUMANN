from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


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
