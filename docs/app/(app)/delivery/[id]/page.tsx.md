
# File Documentation: `delivery/[id]/page.tsx`

-   **Path**: `src/app/(app)/delivery/[id]/page.tsx`
-   **Component**: `RestaurantPage`

## 1. Responsibility

This file defines the dynamic page for a single restaurant's menu. It is the primary interface for users to browse food items and add them to their shopping cart for delivery. Its key responsibilities are:
1.  Fetching the restaurant's details (name, image, location) based on the `id` from the URL.
2.  Displaying the restaurant's menu items, each with a name, description, price, and image.
3.  Providing interactive controls (`+`, `-`, "Add") for adding or removing items from the cart.
4.  Displaying a persistent cart summary on the page that updates in real-time.
5.  Handling the business logic for starting a new cart if items from a different restaurant are already present.

## 2. Component Breakdown

### `RestaurantPage()`

This is the main component for the page.

#### State Management
-   **`showClearCartDialog`**: A boolean state (`useState`) to control the visibility of the "Start a New Cart?" confirmation dialog.
-   **`pendingItem`**: A `MenuItem | null` state (`useState`) to temporarily hold a menu item that a user tries to add when their cart already contains items from another restaurant.

#### Data Hooks
-   **`useParams()`**: A Next.js hook to get the dynamic route parameter (`id`) from the URL.
-   **`useCart()`**: Provides access to the cart state and functions (`cart`, `addToCart`, `removeFromCart`, `clearCart`, `getCartTotal`).

#### Core Logic

-   **Restaurant Data Fetching**:
    -   It uses the `restaurantId` from `useParams` to find the corresponding restaurant object from the `RESTAURANTS` mock data array in `src/lib/data.ts`.
    -   If no restaurant is found, it displays a "not found" message.
-   **Cart Interaction**:
    -   **`handleAddToCart(menuItem)`**: This is the key interaction handler.
        1.  It checks if the cart already contains items from a *different* restaurant (`cart.restaurantId && cart.restaurantId !== restaurantId`).
        2.  If so, it saves the `menuItem` the user just clicked to the `pendingItem` state and sets `showClearCartDialog` to `true`.
        3.  If not, it directly calls the `addToCart` function from `useCart`.
    -   **`handleRemoveFromCart(menuItemId)`**: Directly calls the `removeFromCart` function from `useCart`.
    -   **`confirmClearCartAndAdd()`**: This function is called when the user confirms in the dialog. It calls `clearCart()`, then adds the `pendingItem` to the newly cleared cart.
-   **UI Rendering**:
    -   It maps over `restaurant.menu` to render a `Card` for each menu item.
    -   For each item, it checks the `cart` to see if the item is already present and what its quantity is.
    -   **Conditional Rendering**: Based on the quantity, it either renders a simple "Add" button or a quantity control component (`-` {quantity} `+`).
    -   The cart summary on the side of the page is also conditionally rendered based on whether the cart has items for the current restaurant.

## 3. Data Flow

1.  **URL to Data**: The `id` from the URL is used to fetch the static restaurant and menu data from `src/lib/data.ts`.
2.  **Cart State**: The component reads the current cart state from `CartContext` via the `useCart` hook.
3.  **User Interaction**:
    -   Clicking "Add" or `+`/`-` buttons triggers `handleAddToCart` or `handleRemoveFromCart`.
    -   These handlers call functions from `useCart` (`addToCart`, `removeFromCart`).
4.  **Context Update**: The `useCart` functions update the cart state within the `CartContext`.
5.  **`localStorage` Sync**: `CartProvider` automatically syncs the updated cart state to `localStorage`.
6.  **Re-render**: The `RestaurantPage` component re-renders because the `cart` object it receives from `useCart` has changed, ensuring the UI (item quantities, cart summary) is always up-to-date.

## 4. How it Fits In

This page is the core of the food ordering experience. It's where users make their selections. It demonstrates:
-   Dynamic route handling in Next.js.
-   Reading and updating shared state from a React Context.
-   Handling complex UI logic, such as conditionally rendering buttons and managing confirmation dialogs.
-   A clear separation of concerns, where the component handles UI and user intent, while the `useCart` hook manages the underlying data logic.
