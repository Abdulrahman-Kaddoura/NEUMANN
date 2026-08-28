def test_list_companies_requires_auth(client):
    response = client.get("/companies")

    assert response.status_code == 401


def test_list_companies_returns_known_companies(client, make_user, auth_headers):
    user = make_user()

    response = client.get("/companies", headers=auth_headers(user))

    assert response.status_code == 200
    body = response.json()
    assert "Benton" in body
    assert "Chemel" in body
