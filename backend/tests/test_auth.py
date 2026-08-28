def test_register_creates_user_and_returns_token(client):
    response = client.post(
        "/auth/register",
        json={
            "fullName": "New Person",
            "email": "new@example.com",
            "password": "password123",
            "role": "editor",
        },
    )

    assert response.status_code == 201
    body = response.json()
    assert "accessToken" in body
    assert body["tokenType"] == "bearer"


def test_register_rejects_duplicate_email(client, make_user):
    make_user(email="dupe@example.com")

    response = client.post(
        "/auth/register",
        json={
            "fullName": "Someone Else",
            "email": "dupe@example.com",
            "password": "password123",
            "role": "editor",
        },
    )

    assert response.status_code == 409


def test_register_rejects_short_password(client):
    response = client.post(
        "/auth/register",
        json={
            "fullName": "Weak Password",
            "email": "weak@example.com",
            "password": "short",
            "role": "editor",
        },
    )

    assert response.status_code == 422


def test_register_rejects_admin_role(client):
    response = client.post(
        "/auth/register",
        json={
            "fullName": "Wannabe Admin",
            "email": "admin-wannabe@example.com",
            "password": "password123",
            "role": "admin",
        },
    )

    assert response.status_code == 422


def test_login_succeeds_with_correct_credentials(client, make_user):
    make_user(email="login@example.com", password="password123")

    response = client.post(
        "/auth/login",
        json={"email": "login@example.com", "password": "password123"},
    )

    assert response.status_code == 200
    assert "accessToken" in response.json()


def test_login_fails_with_wrong_password(client, make_user):
    make_user(email="login2@example.com", password="password123")

    response = client.post(
        "/auth/login",
        json={"email": "login2@example.com", "password": "wrong-password"},
    )

    assert response.status_code == 401


def test_login_fails_for_unknown_email(client):
    response = client.post(
        "/auth/login",
        json={"email": "nobody@example.com", "password": "password123"},
    )

    assert response.status_code == 401


def test_me_returns_current_user_with_valid_token(client, make_user, auth_headers):
    user = make_user(email="me@example.com", full_name="Me Person")

    response = client.get("/auth/me", headers=auth_headers(user))

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == "me@example.com"
    assert body["fullName"] == "Me Person"


def test_me_rejects_missing_token(client):
    response = client.get("/auth/me")

    assert response.status_code == 401


def test_me_rejects_invalid_token(client):
    response = client.get(
        "/auth/me", headers={"Authorization": "Bearer not-a-real-token"}
    )

    assert response.status_code == 401
