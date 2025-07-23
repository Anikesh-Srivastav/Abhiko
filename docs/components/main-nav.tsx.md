
# File Documentation: `main-nav.tsx`

-   **Path**: `src/components/main-nav.tsx`
-   **Component**: `MainNav`

## 1. Responsibility

This file defines the `MainNav` component, which serves as the primary navigation header for the authenticated sections of the application. It is displayed on every page wrapped by the `(app)/layout.tsx` file.

Its key responsibilities are:
1.  Providing a consistent and responsive navigation bar.
2.  Displaying the application logo ("Abhiko"), which links to the home page.
3.  Rendering navigation links to key pages (e.g., "Abigram").
4.  Indicating the active page/link based on the current URL path.
5.  Integrating the shopping cart icon, which displays a badge with the number of items and opens the `CartSheet`.
6.  Including the `ThemeToggle` button and the `UserNav` (user profile dropdown) menu.

## 2. Component Breakdown

### `MainNav()`

#### State Management
-   **`isCartOpen`**: A boolean state (`useState`) that controls the visibility of the `CartSheet` component. It is toggled by clicking the shopping cart icon.

#### Data Hooks
-   **`usePathname()`**: A Next.js hook that returns the current URL's pathname as a string (e.g., `/delivery/r1`). This is used to determine which navigation link is "active."
-   **`useCart()`**: Provides access to the `cart` object to calculate the total number of items for the badge on the shopping cart icon.

#### Core Logic

-   **Cart Item Count**:
    -   `cartItemCount` is calculated by using `reduce` on the `cart.items` array to sum up the `quantity` of all items. This value is then displayed in the badge.
-   **Active Link Styling**:
    -   The `cn` utility is used to conditionally apply classes to the navigation `Link` components.
    -   `pathname?.startsWith(link.href)` checks if the current URL path begins with the link's `href`. If it does, the text color is set to `text-foreground` (making it solid); otherwise, it's set to `text-foreground/60` (making it semi-transparent).

#### Rendering
-   The component uses a `header` element with `sticky` positioning and background blur effects for a modern look.
-   It's structured with Flexbox to align items correctly.
-   **Cart Icon**: This is a `Button` that, when clicked, sets `isCartOpen` to `true`. It conditionally renders a badge if `cartItemCount` is greater than 0.
-   **`CartSheet`**: The `CartSheet` component is rendered here, and its `open` and `onOpenChange` props are bound to the `isCartOpen` state and `setIsCartOpen` setter, respectively. This is a common pattern for controlling a child component's state from its parent.

## 3. Data Flow

1.  **Component Load**: `MainNav` renders.
2.  **Data Ingestion**:
    -   It reads the current `pathname` from `usePathname()`.
    -   It reads the `cart` state from `useCart()`.
3.  **Calculation**: It calculates `cartItemCount`.
4.  **Display**:
    -   Navigation links are styled based on the `pathname`.
    -   The cart badge is displayed based on `cartItemCount`.
5.  **User Interaction**:
    -   The user clicks the shopping cart `Button`.
    -   The `onClick` handler calls `setIsCartOpen(true)`.
6.  **State Change & Child Render**: The `isCartOpen` state becomes `true`, which is passed as a prop to `CartSheet`, causing the sheet to slide into view.
7.  **Closing the Sheet**: When the user closes the `CartSheet` (e.g., by clicking the 'X' or outside the sheet), `CartSheet` calls the `onOpenChange` function it received as a prop, which in turn calls `setIsCartOpen(false)`, hiding the sheet.

## 4. How it Fits In

`MainNav` is a fundamental piece of the user interface for logged-in users. It acts as a central control panel, providing access to all major features of the app. It effectively demonstrates:
-   How to create a responsive and sticky header.
-   How a parent component can manage the state and visibility of a child component (the `CartSheet`).
-   How to use hooks like `usePathname` and `useCart` to make a component dynamic and responsive to the application's state.
-   A clean composition of multiple smaller components (`ThemeToggle`, `UserNav`, `CartSheet`) into a single, cohesive unit.
