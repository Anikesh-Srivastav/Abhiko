
# File Documentation: `types.ts`

-   **Path**: `src/lib/types.ts`

## 1. Responsibility

This file is the single source of truth for all custom **TypeScript types and interfaces** used throughout the application. It centralizes the data structure definitions, ensuring consistency and type safety across all components, hooks, and providers.

By defining these shapes in one place, the project benefits from:
-   **Reusability**: The same type can be used in multiple files without re-definition.
-   **Maintainability**: If a data structure needs to change (e.g., adding a new property to `User`), it only needs to be updated in this one file, and TypeScript will immediately flag any parts of the app that are now incorrect.
-   **Clarity**: It provides a clear and concise overview of the application's entire data model.

## 2. Defined Types & Interfaces

### `User`
-   Defines the structure of a user's profile.
-   **Properties**: `id`, `fullName`, `email`, `phone`, `address`, `avatar` (URL string), `points`.

### `MenuItem`
-   Defines a single item on a restaurant's menu.
-   **Properties**: `id`, `name`, `image` (URL string), `description`, `price`.

### `Restaurant`
-   Defines the structure for a restaurant.
-   **Properties**: `id`, `name`, `location`, `image` (URL string), `cuisine`, `menu` (an array of `MenuItem`).

### `CartItem`
-   Represents an item inside the shopping cart.
-   **Logic**: It `extends MenuItem` and adds a `quantity` property. This is a good use of TypeScript's inheritance to avoid repetition.

### `Cart`
-   Defines the shape of the entire shopping cart object that is stored in context and `localStorage`.
-   **Properties**: `items` (an array of `CartItem`), `specialInstructions`, `restaurantId`.

### `Order`
-   Defines the structure of a completed order. This object is created during checkout and used on the payment confirmation page.
-   **Properties**: Contains all necessary information to represent a historical order, including `id`, `userId`, `items`, all cost components (`subtotal`, `deliveryFee`, `taxes`, `discount`, `total`), points earned/redeemed, and a `timestamp`.

### `Post`
-   Defines the structure of a single Abigram social feed post.
-   **Properties**: `postId`, `userId`, `title`, `description`, `restaurantId`, `restaurantName`, `image` (a string that can be a Base64 URI or a URL), `timestamp`.

## 3. How it Fits In

`types.ts` is a foundational file in any robust TypeScript project. It doesn't contain any executable code, but it is imported by virtually every other file that handles data.

-   **Data Layer (`data.ts`)**: The mock data in `data.ts` is typed using these interfaces to ensure it conforms to the expected structure.
-   **Providers (`auth-provider.tsx`, `cart-provider.tsx`)**: The state managed by these providers (e.g., the `user` object, the `cart` object) is strictly typed using these interfaces.
-   **Components**: Components that receive data as props (e.g., `PostCard`, `RestaurantCard`) use these interfaces to define their prop types, enabling type checking and autocompletion.
-   **Hooks**: Custom hooks that return or manage data use these types to define their return values.

In short, this file acts as the "schema" or "contract" for data as it flows through the application, making the entire codebase more predictable, less prone to errors, and easier to navigate.
