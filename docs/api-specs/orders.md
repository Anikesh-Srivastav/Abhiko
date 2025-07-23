
# API Specification: Orders

-   **Base URL**: `/api/orders`
-   **Authentication**: All endpoints require a valid JWT session token.

---

### 1. Create a New Order

-   **Endpoint**: `POST /`
-   **Description**: Submits a new order based on the user's current cart. On successful creation, the backend should clear the user's cart and update their reward points. This endpoint encapsulates the logic currently found on the `/checkout` and `/payment` pages.
-   **Request Body**:
    ```json
    {
      "usePoints": true, // Boolean to indicate if user chose to redeem points
      "specialInstructions": "Please include extra napkins."
    }
    ```
-   **Response (Success - 201 Created)**:
    ```json
    {
      "orderId": "ord_12345abcde",
      "status": "Processing",
      "total": 485.50,
      "estimatedDelivery": "2024-10-27T14:30:00Z"
    }
    ```
-   **Response (Error - 400 Bad Request)**: If the cart is empty or invalid.

---

### 2. Get User's Order History

-   **Endpoint**: `GET /`
-   **Description**: Retrieves a paginated list of the authenticated user's past orders.
-   **Query Parameters**:
    -   `page` (number, optional): The page number for pagination.
    -   `limit` (number, optional): The number of orders per page.
-   **Response (Success - 200)**:
    ```json
    {
      "orders": [
        {
          "id": "ord_12345abcde",
          "restaurantName": "The Royal Tandoor",
          "total": 485.50,
          "status": "Delivered",
          "timestamp": "2024-10-26T14:00:00Z"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 3,
        "totalOrders": 25
      }
    }
    ```

---

### 3. Get Single Order Details

-   **Endpoint**: `GET /:orderId`
-   **Description**: Retrieves the full details of a specific order.
-   **URL Parameters**:
    -   `orderId` (string): The unique ID of the order.
-   **Response (Success - 200)**:
    ```json
    {
      "id": "ord_12345abcde",
      "userId": "user_xyz",
      "restaurantId": "r1",
      "items": [
        { "id": "m1", "name": "Paneer Butter Masala", "quantity": 1, "price": 370 }
      ],
      "subtotal": 370,
      "deliveryFee": 50,
      "taxes": 37,
      "discount": 50,
      "total": 407,
      "pointsEarned": 37,
      "pointsRedeemed": 50,
      "specialInstructions": "...",
      "timestamp": "2024-10-26T14:00:00Z",
      "status": "Delivered"
    }
    ```
