def test_list_users_requires_auth(client):
    response = client.get("/users")

    assert response.status_code == 401


def test_list_users_forbidden_for_non_admin(client, make_user, auth_headers):
    editor = make_user(email="editor@example.com", role="editor")

    response = client.get("/users", headers=auth_headers(editor))

    assert response.status_code == 403


def test_list_users_succeeds_for_admin(client, make_user, auth_headers):
    admin = make_user(email="admin@example.com", role="admin")
    make_user(email="other@example.com", role="viewer")

    response = client.get("/users", headers=auth_headers(admin))

    assert response.status_code == 200
    body = response.json()
    assert len(body["items"]) == 2
    emails = {item["email"] for item in body["items"]}
    assert emails == {"admin@example.com", "other@example.com"}
