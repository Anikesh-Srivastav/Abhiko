
# API Specification: Cart

-   **Base URL**: `/api/cart`
-   **Authentication**: All endpoints require a valid JWT session token.

---

### 1. Get User's Cart

-   **Endpoint**: `GET /`
-   **Description**: Retrieves the current authenticated user's shopping cart.
-   **Response (Success - 200)**:
    ```json
    {
      "items": [
        {
          "id": "m1",
          "name": "Paneer Butter Masala",
          "price": 370,
          "quantity": 2,
          "image": "..."
        }
      ],
      "specialInstructions": "Make it extra spicy.",
      "restaurantId": "r1"
    }
    ```
-   **Response (Empty - 200)**: Returns an empty cart object if the user has no items.

---

### 2. Add/Update Item in Cart

-   **Endpoint**: `POST /items`
-   **Description**: Adds a new item to the cart or increments the quantity of an existing item. The logic should handle starting a new cart if the `restaurantId` changes.
-   **Request Body**:
    ```json
    {
      "itemId": "m2",
      "quantity": 1,
      "restaurantId": "r1"
    }
    ```
-   **Response (Success - 200)**: Returns the updated cart object.

---

### 3. Remove Item from Cart

-   **Endpoint**: `DELETE /items/:itemId`
-   **Description**: Decrements an item's quantity. If the quantity becomes zero, the item is removed from the cart.
-   **URL Parameters**:
    -   `itemId` (string): The ID of the menu item to remove.
-   **Response (Success - 200)**: Returns the updated cart object.

---

### 4. Clear Cart

-   **Endpoint**: `DELETE /`
-   **Description**: Removes all items from the user's cart.
-   **Response (Success - 200)**: Returns an empty cart object.

---

### 5. Update Special Instructions

-   **Endpoint**: `PUT /instructions`
-   **Description**: Updates the special instructions for the cart.
-   **Request Body**:
    ```json
    {
      "instructions": "No onions please."
    }
    ```
-   **Response (Success - 200)**: Returns the updated cart object.
