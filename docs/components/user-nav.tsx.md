
# File Documentation: `user-nav.tsx`

-   **Path**: `src/components/user-nav.tsx`
-   **Component**: `UserNav`

## 1. Responsibility

This file defines the `UserNav` component, which is the user profile dropdown menu located in the main navigation bar. It appears when a user is authenticated and provides quick access to user-specific pages and actions.

Its key responsibilities are:
1.  Displaying the user's avatar as the trigger for the dropdown menu.
2.  Showing the user's full name and email in the menu header.
3.  Providing navigation links to the user's profile, rewards section, and other key app pages.
4.  Including a "Log out" action.

## 2. Component Breakdown

### `UserNav()`

This is a functional component that renders a `DropdownMenu` from ShadCN.

#### Data Hooks
-   **`useAuth()`**: Provides access to the `user` object (to display their details) and the `logout` function.

#### Helper Function
-   **`getInitials(name)`**: A utility function to generate initials from a full name (e.g., "Priya Patel" -> "PP") for the `AvatarFallback` component. This ensures a clean fallback if the avatar image fails to load.

#### Rendering Logic
-   **Early Return**: If `user` is `null`, the component returns `null`, effectively hiding itself. This is a safeguard, as the parent component (`MainNav` or `Home`) usually handles this conditional rendering.
-   **`DropdownMenuTrigger`**: The trigger for the menu is a `Button` containing the user's `Avatar`. The `Avatar` component itself uses `AvatarImage` for the main image and `AvatarFallback` for the initials.
-   **`DropdownMenuContent`**: This is the main body of the dropdown menu.
    -   **`DropdownMenuLabel`**: Displays the user's name and email.
    -   **`DropdownMenuGroup`**: Groups the main navigation items. Each `DropdownMenuItem` uses the `asChild` prop to render a Next.js `Link` component, ensuring proper client-side navigation.
    -   **`DropdownMenuSeparator`**: Visually separates groups of items.
    -   **Logout Item**: A `DropdownMenuItem` with an `onClick` handler that calls the `logout` function from `useAuth`.

## 3. Data Flow

1.  **Component Load**: `UserNav` renders.
2.  **Data Ingestion**: It calls `useAuth()` to get the current `user` object.
3.  **Display**: If `user` exists, their avatar is displayed.
4.  **User Interaction (Click Avatar)**: The user clicks the avatar `Button`, which triggers the `DropdownMenu` to open.
5.  **Display Menu**: The `DropdownMenuContent` is rendered, populated with data from the `user` object (name, email).
6.  **User Interaction (Click Link)**: The user clicks a link (e.g., "Profile"). Because of the `asChild` prop, they are navigated to the corresponding page via Next.js's router.
7.  **User Interaction (Click Logout)**: The user clicks the "Log out" item.
    -   The `onClick` handler calls the `logout` function from `useAuth`.
8.  **`AuthProvider` Action**: The `logout` function in `AuthProvider` sets the user state to `null`, clears the session from `localStorage`, and redirects the user to the `/login` page.

## 4. How it Fits In

`UserNav` is a critical component for user session management and navigation in the authenticated part of the app. It provides a conventional and user-friendly way to access profile-related features and to log out. It demonstrates the effective use of a composite component (`DropdownMenu`) and how to integrate application logic (like `logout`) directly into UI elements. By using the `asChild` prop, it correctly combines the functionality of a menu item with the client-side routing of a `Link`.
