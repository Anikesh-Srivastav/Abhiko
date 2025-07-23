
# File Documentation: `Home` (Landing Page)

-   **Path**: `src/app/page.tsx`
-   **Component**: `Home`

## 1. Responsibility

This file defines the main landing page of the **Abhiko** application. It is the first page most users will see and serves as the public-facing "front door."

Its key responsibilities are:
1.  **Presenting the Brand**: It introduces the Abhiko brand with a prominent headline, a descriptive tagline, and a visually appealing layout.
2.  **Providing Core Navigation**: It offers clear calls-to-action (CTAs) for the two main user flows: "Order From Home" (delivery) and "Dine-In."
3.  **Conditional UI for Authentication**: The header dynamically changes based on the user's authentication status, showing either "Login/Sign Up" buttons or a user profile menu.
4.  **Serving as a Public Hub**: It provides navigation to other key parts of the app, such as the "Abigram" social feed and theme toggling.

## 2. Component Breakdown

### `Home()`

This is the main component for the page.

#### Data Hooks
-   **`useAuth()`**: This hook is used to get the current `user`'s authentication status. The `user` object will be populated if the user is logged in, and `null` otherwise.

#### Rendering Logic

The component is structured into three main sections: `<header>`, `<main>`, and `<footer>`.

-   **`<header>`**:
    -   Contains the "Abhiko" logo, which links back to the home page.
    -   **Conditional Rendering**: The right side of the header uses a ternary operator:
        -   `user ? <UserNav /> : ...`
        -   If a `user` object exists, it renders the `<UserNav />` component (the user profile dropdown).
        -   If `user` is `null`, it renders the "Login" and "Sign Up" buttons.
    -   It also includes the `<ThemeToggle />` button.

-   **`<main>`**:
    -   This is the hero section of the page, laid out in a two-column grid on larger screens.
    -   **Left Column**: Contains the main headline (`<h1>`), a descriptive paragraph (`<p>`), and two primary `Button` components that act as CTAs, linking to `/delivery` and `/dine-in`.
    -   **Right Column**: Displays a large, decorative hero image.

-   **`<footer>`**:
    -   A simple footer that displays a copyright notice with the current year, calculated dynamically with `new Date().getFullYear()`.

## 3. Data Flow

1.  **Component Load**: The `Home` component renders.
2.  **Authentication Check**: The `useAuth()` hook is called. The `AuthProvider` checks `localStorage` for a user session and returns either the `user` object or `null`.
3.  **Conditional Rendering**: The component re-renders based on the value of `user`. The header UI adapts to show the correct navigation options for the user's logged-in status.
4.  **User Navigation**: The user can click on any of the links or buttons to navigate to other parts of the application (e.g., `/login`, `/delivery`, `/abigram`).

## 4. How it Fits In

The landing page is the primary entry point for all users. It effectively showcases the application's value proposition and provides clear, distinct paths for users to begin their journey, whether they are new or returning. The dynamic header is a key feature, demonstrating how a single page can serve both authenticated and unauthenticated users by adapting its UI based on context state. This page is purely presentational; all complex logic (like authentication) is handled by the hooks and providers it consumes.
