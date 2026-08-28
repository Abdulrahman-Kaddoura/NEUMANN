def test_list_employees_requires_auth(client):
    response = client.get("/employees")

    assert response.status_code == 401


def test_list_employees_returns_seeded_data(client, make_user, auth_headers, make_employee):
    user = make_user()
    make_employee(first_name="James", last_name="Butt", company="Benton")
    make_employee(first_name="Art", last_name="Venere", company="Chemel")

    response = client.get("/employees", headers=auth_headers(user))

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 2
    assert len(body["items"]) == 2


def test_list_employees_search_filters_by_name(client, make_user, auth_headers, make_employee):
    user = make_user()
    make_employee(first_name="James", last_name="Butt", company="Benton")
    make_employee(first_name="Art", last_name="Venere", company="Chemel")

    response = client.get("/employees", params={"search": "Venere"}, headers=auth_headers(user))

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 1
    assert body["items"][0]["lastName"] == "Venere"


def test_list_employees_company_filter(client, make_user, auth_headers, make_employee):
    user = make_user()
    make_employee(first_name="James", last_name="Butt", company="Benton")
    make_employee(first_name="Art", last_name="Venere", company="Chemel")

    response = client.get("/employees", params={"company": ["Chemel"]}, headers=auth_headers(user))

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 1
    assert body["items"][0]["company"] == "Chemel"


def test_list_employees_pagination(client, make_user, auth_headers, make_employee):
    user = make_user()
    for i in range(5):
        make_employee(first_name=f"Employee{i}", last_name="Test")

    response = client.get(
        "/employees", params={"page": 2, "page_size": 2}, headers=auth_headers(user)
    )

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 5
    assert body["page"] == 2
    assert body["pageSize"] == 2
    assert len(body["items"]) == 2


def test_list_employees_invalid_sort_field_returns_400(client, make_user, auth_headers):
    user = make_user()

    response = client.get("/employees", params={"sort": "notAField"}, headers=auth_headers(user))

    assert response.status_code == 400


def test_list_employees_empty_result(client, make_user, auth_headers):
    user = make_user()

    response = client.get("/employees", headers=auth_headers(user))

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 0
    assert body["items"] == []


def test_get_employee_by_id(client, make_user, auth_headers, make_employee):
    user = make_user()
    employee = make_employee()

    response = client.get(f"/employees/{employee.id}", headers=auth_headers(user))

    assert response.status_code == 200
    assert response.json()["id"] == employee.id


def test_get_employee_not_found(client, make_user, auth_headers):
    user = make_user()

    response = client.get("/employees/999999", headers=auth_headers(user))

    assert response.status_code == 404


VALID_EMPLOYEE_PAYLOAD = {
    "firstName": "Nova",
    "lastName": "Reyes",
    "company": "Benton",
    "jobTitle": "Designer",
    "email": "nova@example.com",
    "address": "1 Main St",
    "city": "Austin",
    "county": "Travis",
}


def test_create_employee_requires_editor_role(client, make_user, auth_headers):
    viewer = make_user(email="viewer@example.com", role="viewer")

    response = client.post(
        "/employees", json=VALID_EMPLOYEE_PAYLOAD, headers=auth_headers(viewer)
    )

    assert response.status_code == 403


def test_create_employee_succeeds_for_editor(client, make_user, auth_headers):
    editor = make_user(email="editor@example.com", role="editor")

    response = client.post(
        "/employees", json=VALID_EMPLOYEE_PAYLOAD, headers=auth_headers(editor)
    )

    assert response.status_code == 201
    body = response.json()
    assert body["firstName"] == "Nova"
    # brandColor is server-assigned from the company, never client-supplied.
    assert body["brandColor"] == "#8bc447"


def test_create_employee_ignores_client_supplied_brand_color(client, make_user, auth_headers):
    editor = make_user(email="editor2@example.com", role="editor")
    payload = {**VALID_EMPLOYEE_PAYLOAD, "email": "nova2@example.com", "brandColor": "#000000"}

    response = client.post("/employees", json=payload, headers=auth_headers(editor))

    assert response.status_code == 201
    assert response.json()["brandColor"] == "#8bc447"


def test_create_employee_missing_required_field_returns_422(client, make_user, auth_headers):
    editor = make_user(email="editor3@example.com", role="editor")
    payload = {**VALID_EMPLOYEE_PAYLOAD, "email": "nova3@example.com"}
    del payload["firstName"]

    response = client.post("/employees", json=payload, headers=auth_headers(editor))

    assert response.status_code == 422


def test_create_employee_rejects_unknown_company(client, make_user, auth_headers):
    editor = make_user(email="editor4@example.com", role="editor")
    payload = {**VALID_EMPLOYEE_PAYLOAD, "email": "nova4@example.com", "company": "NotARealCompany"}

    response = client.post("/employees", json=payload, headers=auth_headers(editor))

    assert response.status_code == 422


def test_create_employee_rejects_duplicate_email(client, make_user, auth_headers, make_employee):
    editor = make_user(email="editor5@example.com", role="editor")
    make_employee(email="taken@example.com")
    payload = {**VALID_EMPLOYEE_PAYLOAD, "email": "taken@example.com"}

    response = client.post("/employees", json=payload, headers=auth_headers(editor))

    assert response.status_code == 409


def test_update_employee_requires_editor_role(client, make_user, auth_headers, make_employee):
    viewer = make_user(email="viewer2@example.com", role="viewer")
    employee = make_employee()

    response = client.put(
        f"/employees/{employee.id}", json=VALID_EMPLOYEE_PAYLOAD, headers=auth_headers(viewer)
    )

    assert response.status_code == 403


def test_update_employee_succeeds_for_editor(client, make_user, auth_headers, make_employee):
    editor = make_user(email="editor6@example.com", role="editor")
    employee = make_employee(first_name="Old", last_name="Name", email=None)
    payload = {**VALID_EMPLOYEE_PAYLOAD, "email": "updated@example.com"}

    response = client.put(f"/employees/{employee.id}", json=payload, headers=auth_headers(editor))

    assert response.status_code == 200
    body = response.json()
    assert body["firstName"] == "Nova"
    assert body["id"] == employee.id


def test_update_employee_not_found(client, make_user, auth_headers):
    editor = make_user(email="editor7@example.com", role="editor")

    response = client.put(
        "/employees/999999", json=VALID_EMPLOYEE_PAYLOAD, headers=auth_headers(editor)
    )

    assert response.status_code == 404


def test_update_employee_rejects_duplicate_email_of_another_employee(
    client, make_user, auth_headers, make_employee
):
    editor = make_user(email="editor8@example.com", role="editor")
    make_employee(email="other@example.com")
    target = make_employee(first_name="Target", email=None)
    payload = {**VALID_EMPLOYEE_PAYLOAD, "email": "other@example.com"}

    response = client.put(f"/employees/{target.id}", json=payload, headers=auth_headers(editor))

    assert response.status_code == 409


def test_delete_employee_requires_editor_role(client, make_user, auth_headers, make_employee):
    viewer = make_user(email="viewer3@example.com", role="viewer")
    employee = make_employee()

    response = client.delete(f"/employees/{employee.id}", headers=auth_headers(viewer))

    assert response.status_code == 403


def test_delete_employee_succeeds_for_editor(client, make_user, auth_headers, make_employee):
    editor = make_user(email="editor9@example.com", role="editor")
    employee = make_employee()

    response = client.delete(f"/employees/{employee.id}", headers=auth_headers(editor))
    assert response.status_code == 204

    follow_up = client.get(f"/employees/{employee.id}", headers=auth_headers(editor))
    assert follow_up.status_code == 404


def test_delete_employee_not_found(client, make_user, auth_headers):
    editor = make_user(email="editor10@example.com", role="editor")

    response = client.delete("/employees/999999", headers=auth_headers(editor))

    assert response.status_code == 404
