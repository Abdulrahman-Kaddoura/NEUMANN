from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from ..constants import COMPANY_BRAND_COLORS
from ..db.database import get_db
from ..db.models import Employee
from ..schemas import EmployeeCreate, EmployeeListOut, EmployeeOut, EmployeeUpdate

router = APIRouter(prefix="/employees", tags=["employees"])

SORTABLE_FIELDS = {
    "firstName": Employee.first_name,
    "lastName": Employee.last_name,
    "company": Employee.company,
    "jobTitle": Employee.job_title,
    "city": Employee.city,
}


@router.get("", response_model=EmployeeListOut)
def list_employees(
    search: str | None = None,
    company: list[str] | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=100),
    sort: str | None = None,
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

    if sort:
        descending = sort.startswith("-")
        field = sort[1:] if descending else sort
        column = SORTABLE_FIELDS.get(field)
        if column is None:
            raise HTTPException(status_code=400, detail=f"Cannot sort by '{field}'")
        query = query.order_by(column.desc() if descending else column.asc())

    total = query.count()
    items = query.offset((page - 1) * page_size).limit(page_size).all()

    return EmployeeListOut(items=items, total=total, page=page, page_size=page_size)


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