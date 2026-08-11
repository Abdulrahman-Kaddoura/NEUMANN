from .database import SessionLocal
from .models import Employee
from .seed_data import EMPLOYEES


def seed() -> None:
    db = SessionLocal()
    try:
        if db.query(Employee).count() > 0:
            print("Employees table already seeded, skipping.")
            return

        db.bulk_insert_mappings(Employee, EMPLOYEES)
        db.commit()
        print(f"Seeded {len(EMPLOYEES)} employees.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
