
# File Documentation: `payment/page.tsx`

-   **Path**: `src/app/(app)/payment/page.tsx`
-   **Component**: `PaymentPage`

## 1. Responsibility

This file defines the final step in the checkout process: the payment confirmation page. It is designed to simulate the processing of an order after the user has reviewed their details on the checkout page. Its key responsibilities are:
1.  Retrieving the final order details that were prepared by the `/checkout` page.
2.  Displaying a final summary of the total amount to be paid.
3.  Simulating a payment processing delay when the user confirms.
4.  On successful "payment," updating the application's state: clearing the cart, updating user points, and cleaning up temporary data.
5.  Redirecting the user to a relevant page (e.g., back to the main delivery page) with a success notification.

## 2. Component Breakdown

### `PaymentPage()`

This is the main component for the page.

#### State Management
-   **`order`**: An `Order | null` state (`useState`) to hold the final order details retrieved from `localStorage`.
-   **`isProcessing`**: A boolean state (`useState`) to track the payment simulation. It's used to disable the confirmation button and show a loader.

#### Data Hooks
-   **`useCart()`**: Provides the `clearCart` function to empty the shopping cart after the order is complete.
-   **`useAuth()`**: Provides the `user` object and the `addPoints` and `spendPoints` functions to update the user's rewards balance.
-   **`useRouter()`**: Used for navigation (redirecting after payment).
-   **`useToast()`**: Used to display the final "Order Placed!" success message.

#### Core Logic

-   **`useEffect` Hook**:
    -   This hook runs once on component mount to retrieve the final order details.
    -   It reads the `abiko-final-order` key from `localStorage`.
    -   If the data exists, it's parsed and stored in the `order` state.
    -   **Fallback**: If no order details are found in `localStorage` (e.g., the user navigated here directly or refreshed the page after completion), it redirects the user back to `/checkout` to prevent errors.
-   **Event Handling**:
    -   **`handleConfirmPayment()`**: This is the core function triggered by the "Pay" button.
        1.  It sets `isProcessing` to `true` to show a loading state.
        2.  It uses `setTimeout` to simulate a 1.5-second payment processing delay.
        3.  **Inside `setTimeout`**:
            a.  **Update Points**: Calls `addPoints` and `spendPoints` from `useAuth` to update the user's balance.
            b.  **Clear Cart**: Calls `clearCart` from `useCart`.
            c.  **Cleanup**: Removes the `abiko-final-order` key from `localStorage` as it's no longer needed.
            d.  **Notify & Redirect**: Shows a success toast and redirects the user to `/delivery`.

#### Rendering
-   **Loading State**: If the `order` object has not yet been loaded from `localStorage`, it displays a loading spinner.
-   **Order Summary**: Once the `order` data is available, it renders a `Card` displaying the final payment details: subtotal, fees, discounts, and the final total to be paid.
-   **Processing State**: The "Pay" button's text and disabled state are controlled by `isProcessing`. It shows a loader and "Processing..." text during the simulated payment.

## 3. Data Flow

1.  **Data Ingestion**: The page loads and the `useEffect` hook reads the serialized order object from `localStorage` (where it was placed by the `/checkout` page). The data is deserialized and stored in the `order` state.
2.  **User Confirmation**: The user reviews the final amount and clicks the "Pay" button.
3.  **State Update & Simulation**: `handleConfirmPayment` is called. It updates the `isProcessing` state and begins the `setTimeout`.
4.  **Application-Wide State Changes**: After the timeout, the function calls methods from the `useAuth` and `useCart` hooks.
5.  **Context and `localStorage` Updates**:
    -   The `AuthContext` updates the user's points and syncs this change to `localStorage`.
    -   The `CartContext` clears the cart items and syncs this change to `localStorage`.
    -   The temporary `abiko-final-order` item is removed from `localStorage`.
6.  **Navigation**: The user is redirected, and the application state (cart, points) is now consistent with a completed order.

## 4. How it Fits In

This page concludes the entire ordering flow. It acts as the final "commit" step, responsible for triggering all the necessary state changes that reflect a successful transaction. It effectively demonstrates how to manage post-action side effects (like updating points and clearing carts) and how to use `localStorage` as a temporary bridge for passing state between pages in a multi-step process.
