
# File Documentation: `cart-provider.tsx`

-   **Path**: `src/providers/cart-provider.tsx`
-   **Component**: `CartProvider`
-   **Context**: `CartContext`

## 1. Responsibility

This file is the core of the application's shopping cart system. It defines the `CartProvider` component, which uses React Context to manage the entire state of the shopping cart and provide functions for modifying it.

Its key responsibilities are:
1.  **Managing Cart State**: It holds the current state of the cart, which includes the list of items (`items`), any special instructions (`specialInstructions`), and the ID of the restaurant the items are from (`restaurantId`).
2.  **Persistence**: It uses the `useLocalStorage` hook with the key `'abiko-cart'` to ensure the user's cart persists across page reloads and browser sessions.
3.  **Providing Cart Functions**: It exposes a clean API of functions (`addToCart`, `removeFromCart`, `clearCart`, etc.) to the rest of the application.
4.  **Handling Business Logic**: It contains the logic for adding items, incrementing/decrementing quantities, removing items, and clearing the cart.
5.  **Calculating Totals**: It provides a helper function to calculate the total price of all items in the cart.

## 2. Component & Context Breakdown

### `CartContext`
-   `createContext<CartContextType | null>(null)`: This creates the context object. It's initialized to `null`, and its value will be defined by the provider. The `CartContextType` interface specifies the shape of the provided value.

### `initialCartState`
-   A constant object that defines the default state for an empty cart. This is used both for the initial state of the `useLocalStorage` hook and for the `clearCart` function.

### `CartProvider({ children })`
This is the provider component that contains all the state and logic.

#### Data Hooks & State
-   **`useLocalStorage`**:
    -   `cart`: Stores the current `Cart` object. It's initialized with `initialCartState` if nothing is in `localStorage`.
-   **`useToast`**: Used to show a confirmation toast when an item is added to the cart.

#### Core Functions

All the core functions are wrapped in `useCallback` for performance optimization. This prevents the functions from being re-created on every render unless their dependencies (`setCart`, `toast`) change.

-   **`addToCart(itemToAdd, restaurantId)`**:
    -   Checks if the item already exists in the cart.
    -   If it exists, it increments the `quantity`.
    -   If it's a new item, it adds it to the `items` array with `quantity: 1`.
    -   It also sets the `restaurantId` for the cart.
    -   Shows a success toast.

-   **`removeFromCart(itemIdToRemove)`**:
    -   Finds the item in the cart.
    -   If its quantity is greater than 1, it decrements the `quantity`.
    -   If its quantity is 1, it filters the item out of the `items` array completely.
    -   If removing the item makes the cart empty, it resets `restaurantId` to `null`.

-   **`updateSpecialInstructions(instructions)`**:
    -   A simple setter that updates the `specialInstructions` string in the cart state.

-   **`clearCart()`**:
    -   Resets the entire cart state back to `initialCartState`.

-   **`getCartTotal()`**:
    -   Uses `reduce` to calculate the total price (as a number) of all items in the cart.

## 3. Data Flow

1.  **Provider Wrapping**: `CartProvider` is included in `app-providers.tsx`, wrapping the entire application.
2.  **Initialization**: On app load, `CartProvider` initializes its `cart` state from `localStorage` via the `useLocalStorage` hook.
3.  **Consumption**: A component (e.g., `RestaurantPage`) calls `const { addToCart } = useCart();`.
4.  **Action**: The user clicks an "Add" button, which calls `addToCart(item)`.
5.  **Internal Logic**: The `addToCart` function inside `CartProvider` executes its logic.
6.  **State Change**: It calls `setCart`, which is the setter function from the `useLocalStorage` hook.
7.  **`useLocalStorage` Action**: `setCart` does two things:
    a.  It updates the internal React state, triggering a re-render of `CartProvider`.
    b.  It automatically saves the new, updated cart object to `localStorage`.
8.  **Context Re-render**: Because the `cart` state in `CartProvider` has changed, the `value` prop of the `CartContext.Provider` is a new object. This causes all components subscribed to the context (via the `useCart` hook) to re-render with the latest cart data.

## 4. How it Fits In

The `CartProvider` is the single source of truth for all shopping cart data and operations. It perfectly encapsulates the cart's state and logic, providing a clean, reactive, and persistent shopping cart experience. By using the Provider pattern, it allows any component in the app to interact with the cart without needing to pass props down through multiple levels of the component tree.
