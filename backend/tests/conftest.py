import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from backend.core.limiter import limiter
from backend.core.security import create_access_token, hash_password
from backend.db.database import Base, get_db
from backend.db.models import Employee, User
from backend.main import app

TEST_DATABASE_URL = "sqlite+pysqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture()
def db_session():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    limiter.reset()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    limiter.reset()


@pytest.fixture()
def make_user(db_session):
    def _make_user(
        email: str = "user@example.com",
        password: str = "password123",
        full_name: str = "Test User",
        role: str = "viewer",
    ) -> User:
        user = User(
            email=email,
            hashed_password=hash_password(password),
            full_name=full_name,
            role=role,
        )
        db_session.add(user)
        db_session.commit()
        db_session.refresh(user)
        return user

    return _make_user


@pytest.fixture()
def auth_headers():
    def _auth_headers(user: User) -> dict[str, str]:
        token = create_access_token(subject=user.email)
        return {"Authorization": f"Bearer {token}"}

    return _auth_headers


@pytest.fixture()
def make_employee(db_session):
    def _make_employee(
        first_name: str = "James",
        last_name: str = "Butt",
        company: str = "Benton",
        job_title: str = "Account Manager",
        email: str | None = None,
        address: str = "6649 N Blue Gum St",
        city: str = "New Orleans",
        county: str = "Orleans",
        brand_color: str = "#8bc447",
    ) -> Employee:
        employee = Employee(
            first_name=first_name,
            last_name=last_name,
            company=company,
            job_title=job_title,
            email=email,
            address=address,
            city=city,
            county=county,
            brand_color=brand_color,
        )
        db_session.add(employee)
        db_session.commit()
        db_session.refresh(employee)
        return employee

    return _make_employee
