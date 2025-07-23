
# File Documentation: `use-cart.ts`

-   **Path**: `src/hooks/use-cart.ts`
-   **Hook**: `useCart`

## 1. Responsibility

This file defines the `useCart` custom hook. Similar to `useAuth`, its purpose is to provide a clean and type-safe way for components to access the `CartContext`.

This pattern centralizes the logic for consuming the cart's state and actions, offering key benefits:
1.  **Abstraction**: Components don't need to know about `CartContext` directly. They just use the `useCart` hook.
2.  **Error Handling**: It includes a built-in check to ensure it's used within a `CartProvider`, throwing a clear error if not. This prevents runtime errors and aids in debugging.
3.  **Readability**: It simplifies component code, making it more declarative and easier to understand (`const { cart, addToCart } = useCart();`).

## 2. Hook Breakdown

### `useCart()`

This is the custom hook.

#### Core Logic
1.  **`const context = useContext(CartContext)`**: It uses the standard React `useContext` hook to access the value provided by the nearest `CartProvider`. This value is an object containing the `cart` state and functions like `addToCart`, `removeFromCart`, etc.
2.  **`if (!context)`**: It performs a crucial check to see if the context is `null` or `undefined`. This will be the case if a component calls `useCart` but is not a descendant of `<CartProvider>`.
3.  **`throw new Error(...)`**: If the context is missing, it throws an error with a helpful message, guiding the developer to fix the component hierarchy.
4.  **`return context`**: If the context is available, the hook returns it. The return value is typed as `CartContextType`, giving any consuming component full TypeScript support for the cart's state and methods.

## 3. Data Flow

`useCart` is a consumer hook; it reads data and functions from the `CartProvider`.

1.  **`CartProvider`**: Provides the context value, which includes the `cart` state object and modifier functions.
2.  **Component**: A component that needs cart data (e.g., `RestaurantPage`, `CartSheet`) calls `useCart()`.
3.  **`useCart`**: The hook accesses the context from the provider.
4.  **Return Value**: The hook passes the entire context object back to the component.
5.  **Component Usage**: The component destructures the properties it needs, such as `const { cart, addToCart } = useCart();`, and can then use them to render UI or respond to user events.

## 4. How it Fits In

`useCart` is the public API for interacting with the application's shopping cart system from within React components. It decouples the components from the `CartContext` implementation itself, making the system more modular. Any component that needs to display cart information or modify the cart's contents will use this hook. It is the designated entry point for all cart-related interactions in the view layer of the application.
