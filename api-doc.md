# Nyawahkeun API Documentation

1.[POST /register](#1-post-register)

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "address": "string",
  "phoneNumber": "string",
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "message": "Success create Account for ..."
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Phone Number is required"
}
```
&nbsp;