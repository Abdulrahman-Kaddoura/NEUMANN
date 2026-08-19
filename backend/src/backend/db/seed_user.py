from ..core.security import hash_password
from .database import SessionLocal
from .models import User

ADMIN_EMAIL = "admin@mail.com"
ADMIN_PASSWORD = "admin123"


def seed() -> None:
    db = SessionLocal()
    try:
        if db.query(User).filter(User.email == ADMIN_EMAIL).first() is not None:
            print("Admin user already seeded, skipping.")
            return

        user = User(
            email=ADMIN_EMAIL,
            hashed_password=hash_password(ADMIN_PASSWORD),
            full_name="Admin",
            role="admin",
        )
        db.add(user)
        db.commit()
        print(f"Seeded admin user: {ADMIN_EMAIL} / {ADMIN_PASSWORD}")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
