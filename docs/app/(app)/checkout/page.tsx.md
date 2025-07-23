
# File Documentation: `checkout/page.tsx`

-   **Path**: `src/app/(app)/checkout/page.tsx`
-   **Component**: `CheckoutPage`

## 1. Responsibility

This file defines the checkout page, which is the crucial step between adding items to the cart and confirming the payment. Its primary responsibilities are:
1.  Displaying a detailed summary of the items in the user's cart.
2.  Allowing the user to add special instructions for the kitchen.
3.  Calculating and displaying the complete cost breakdown, including subtotal, delivery fees, taxes, and discounts.
4.  Integrating with the rewards system by allowing users to redeem their points for a discount.
5.  Preparing the final order details and redirecting the user to the payment confirmation page.

## 2. Component Breakdown

### `CheckoutPage()`

This is the main component for the page.

#### State Management
-   **`usePoints`**: A boolean state (`useState`) that tracks whether the user has toggled the switch to use their reward points for a discount.

#### Data Hooks
-   **`useCart()`**: Provides access to the cart state (`cart`), including items and special instructions, and the `updateSpecialInstructions` function.
-   **`useAuth()`**: Provides access to the current `user`'s data, which is essential for retrieving their available reward points.
-   **`useRouter()`**: Used for navigation, specifically to redirect to the `/payment` page.
-   **`useToast()`**: Used for displaying error notifications (e.g., if the user is not logged in).

#### Core Logic

-   **Early Return**: If the cart is empty or the restaurant ID is missing, the component renders a message and a button to browse restaurants, preventing users from checking out an empty cart.
-   **Cost Calculation**:
    -   `subtotal` is calculated by summing the price of all items.
    -   `deliveryFee` and `taxes` are calculated based on fixed values or percentages.
    -   `discount` is calculated based on the `usePoints` state. If true, it takes the lesser of the user's total points or the subtotal (since points can't cover fees/taxes). 1 point = 1 Rupee.
    -   `total` is the final amount to be paid.
-   **Event Handling**:
    -   **`handleProceedToPayment()`**:
        1.  Checks if a user is logged in.
        2.  Constructs a `finalOrder` object containing all relevant details (items, costs, points earned/redeemed, instructions).
        3.  **Serializes this `finalOrder` object into a JSON string and saves it to `localStorage` under the key `abiko-final-order`**. This is a crucial step for passing data to the next page without using complex state management or URL params.
        4.  Redirects the user to `/payment`.

## 3. Data Flow

1.  **Data Ingestion**: The page loads and reads data from two main sources via context hooks:
    -   `CartContext` (`useCart`) provides the list of items and special instructions.
    -   `AuthContext` (`useAuth`) provides the user's reward points.
2.  **User Interaction**:
    -   The user can type in the "Special Instructions" `Textarea`, which calls `updateSpecialInstructions` to update the cart state in real-time (and thus `localStorage`).
    -   The user can toggle the "Use Points" `Switch`, which updates the `usePoints` state, triggering a re-render and recalculation of the `discount` and `total`.
3.  **Data Preparation**: When the "Proceed to Payment" button is clicked, all calculated values and cart data are assembled into a single `finalOrder` object.
4.  **Data Handoff**: The `finalOrder` object is written to `localStorage`.
5.  **Navigation**: The app navigates to `/payment`, which will then read this `finalOrder` data from `localStorage` to display the final confirmation screen.

## 4. How it Fits In

The checkout page is a critical junction in the ordering process. It acts as the bridge between the cart and the final payment confirmation. It showcases how to handle and aggregate data from multiple sources (cart state, user state) and demonstrates a practical method (`localStorage`) for passing complex state between different pages in a client-side navigation flow.
