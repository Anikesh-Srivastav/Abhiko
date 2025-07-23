
# API Specification: Users & Authentication

-   **Base URL**: `/api/auth` & `/api/users`
-   **Authentication**: Some endpoints are public (`/login`, `/signup`), while others require a valid JWT token.

---

## Authentication Endpoints (`/api/auth`)

### 1. User Signup

-   **Endpoint**: `POST /signup`
-   **Description**: Registers a new user.
-   **Request Body**:
    ```json
    {
      "fullName": "Priya Patel",
      "email": "priya@example.com",
      "password": "strongpassword123",
      "phone": "9876543210",
      "address": "123 Food Lane, Bangalore",
      "avatar": "https://placehold.co/100x100.png"
    }
    ```
-   **Response (Success - 201 Created)**: Returns the new user object and a JWT token.
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "user_123",
        "fullName": "Priya Patel",
        "email": "priya@example.com",
        "points": 0,
        "avatar": "..."
      }
    }
    ```
-   **Response (Error - 409 Conflict)**: If the email already exists.

---

### 2. User Login

-   **Endpoint**: `POST /login`
-   **Description**: Authenticates a user and returns a JWT token.
-   **Request Body**:
    ```json
    {
      "email": "priya@example.com",
      "password": "strongpassword123"
    }
    ```
-   **Response (Success - 200)**: Returns the user object and a JWT token.
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "user_123",
        "fullName": "Priya Patel",
        "email": "priya@example.com",
        "points": 250,
        "avatar": "..."
      }
    }
    ```
-   **Response (Error - 401 Unauthorized)**: If credentials are invalid.

---

## User Profile Endpoints (`/api/users`)

### 3. Get User Profile

-   **Endpoint**: `GET /profile`
-   **Authentication**: Required.
-   **Description**: Retrieves the profile of the currently authenticated user.
-   **Response (Success - 200)**: Returns the full user object.

---

### 4. Update User Profile

-   **Endpoint**: `PUT /profile`
-   **Authentication**: Required.
-   **Description**: Updates the profile of the currently authenticated user.
-   **Request Body** (include only fields to be updated):
    ```json
    {
      "fullName": "Priya Sharma",
      "address": "456 New Road, Bangalore"
    }
    ```
-   **Response (Success - 200)**: Returns the updated user object.
