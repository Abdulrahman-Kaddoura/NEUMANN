from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from ..constants import COMPANY_BRAND_COLORS
from ..db.database import get_db
from ..db.models import Employee
from ..schemas import EmployeeCreate, EmployeeOut, EmployeeUpdate

router = APIRouter(prefix="/employees", tags=["employees"])


@router.get("", response_model=list[EmployeeOut])
def list_employees(
    search: str | None = None,
    company: list[str] | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Employee)

    if search:
        pattern = f"%{search}%"
        query = query.filter(
            or_(
                Employee.first_name.ilike(pattern),
                Employee.last_name.ilike(pattern),
                Employee.company.ilike(pattern),
                Employee.job_title.ilike(pattern),
                Employee.city.ilike(pattern),
            )
        )

    if company:
        query = query.filter(Employee.company.in_(company))

    return query.all()


@router.get("/{employee_id}", response_model=EmployeeOut)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.get(Employee, employee_id)
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
    

@router.post("", response_model=EmployeeOut, status_code=201)
def create_employee(
    payload: EmployeeCreate,
    db: Session = Depends(get_db),
):
    employee = Employee(
        first_name=payload.first_name,
        last_name=payload.last_name,
        company=payload.company,
        job_title=payload.job_title,
        email=payload.email,
        address=payload.address,
        city=payload.city,
        county=payload.county,
        brand_color=COMPANY_BRAND_COLORS[payload.company],
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee

@router.put("/{employee_id}", response_model=EmployeeOut)
def update_employee(
    employee_id: int,
    payload: EmployeeUpdate,
    db: Session = Depends(get_db),
):
    employee = db.get(Employee, employee_id)

    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.first_name = payload.first_name
    employee.last_name = payload.last_name
    employee.company = payload.company
    employee.job_title = payload.job_title
    employee.email = payload.email
    employee.address = payload.address
    employee.city = payload.city
    employee.county = payload.county
    employee.brand_color = COMPANY_BRAND_COLORS[payload.company]

    db.commit()
    db.refresh(employee)

    return employee

@router.delete("/{employee_id}", status_code=204)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    employee = db.get(Employee, employee_id)

    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()

    return None