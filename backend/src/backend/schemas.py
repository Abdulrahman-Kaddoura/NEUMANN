from pydantic import BaseModel


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

    model_config = {"from_attributes": True}
