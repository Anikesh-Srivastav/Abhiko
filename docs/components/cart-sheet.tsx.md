
# File Documentation: `cart-sheet.tsx`

-   **Path**: `src/components/cart-sheet.tsx`
-   **Component**: `CartSheet`

## 1. Responsibility

This file defines the `CartSheet` component, a slide-out panel (a "sheet") that provides a summary of the user's current shopping cart. It is accessible from the main navigation bar and allows users to quickly view and manage their cart without leaving the current page.

Its key responsibilities are:
1.  Displaying all items currently in the cart, along with their quantities and prices.
2.  Providing controls to increment, decrement, or remove items from the cart.
3.  Showing the total price of all items in the cart.
4.  Offering actions to "Clear Cart" or proceed to "Checkout."
5.  Displaying an empty state message if the cart has no items.
6.  Fetching restaurant details to show where the user is ordering from.

## 2. Component Breakdown

### `CartSheet({ open, onOpenChange })`

#### Props
-   `open`: A boolean that controls whether the sheet is visible.
-   `onOpenChange`: A callback function to change the `open` state, allowing the parent component (`MainNav`) to control its visibility.

#### Data Hooks
-   **`useCart()`**: Provides access to the entire cart context, including the `cart` object and functions like `addToCart`, `removeFromCart`, `clearCart`, and `getCartTotal`.

#### Core Logic

-   **Restaurant Data**: It finds the restaurant's details (`restaurant.name`) by searching the `RESTAURANTS` mock data array using the `cart.restaurantId` from the `useCart` hook.
-   **Conditional Rendering**: The component's content changes drastically based on whether the cart is empty.
    -   **If `cart.items.length > 0`**:
        -   It renders a list of cart items, mapping over the `cart.items` array.
        -   Each item in the list has its own `+`/`-` controls that call `addToCart` and `removeFromCart`.
        -   The `SheetFooter` is displayed, containing the total price (from `getCartTotal()`) and the "Clear Cart" and "Checkout" buttons.
    -   **If cart is empty**:
        -   It renders a message indicating the cart is empty, along with an icon and a "Browse Restaurants" button to guide the user.
        -   The footer is hidden.

## 3. Data Flow

1.  **State from Parent**: The `CartSheet`'s visibility is controlled by the `isCartOpen` state in its parent, `MainNav.tsx`, which passes `open` and `onOpenChange` as props.
2.  **Data Ingestion**: The component reads the current cart state (`cart`) directly from the `CartContext` via the `useCart` hook.
3.  **Display**: The component renders the cart items and total based on the `cart` data.
4.  **User Interaction**:
    -   The user clicks the `+`/`-` buttons, which call `addToCart` or `removeFromCart`.
    -   The user clicks "Clear Cart," which calls `clearCart`.
    -   The user clicks "Checkout," which is a `Link` that navigates to `/checkout`. The `onOpenChange(false)` is also called to close the sheet.
5.  **Context Update**: The functions from `useCart` update the state within the `CartContext`.
6.  **`localStorage` Sync**: The `CartProvider` automatically persists the changes to `localStorage`.
7.  **Re-render**: Any change to the cart state causes the `CartSheet` component to re-render, ensuring the displayed information is always synchronized with the actual cart state.

## 4. How it Fits In

The `CartSheet` is a crucial UI component for a seamless e-commerce experience. It provides non-intrusive, easy access to the cart from anywhere in the authenticated section of the app. It's a great example of a component that is purely presentational and interactive, delegating all of its state management logic to a centralized context (`CartContext`), which makes it clean, reusable, and easy to maintain.
