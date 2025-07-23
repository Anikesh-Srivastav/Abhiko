
# File Documentation: `(app)/layout.tsx`

-   **Path**: `src/app/(app)/layout.tsx`
-   **Component**: `AppLayout`

## 1. Responsibility

This file defines the main layout for all **authenticated** routes within the application. It wraps pages that are part of the main user experience (e.g., `/delivery`, `/profile`, `/abigram`), but not public pages like `/login` or `/signup`.

Its key responsibilities are:
1.  **Authentication Guard**: It protects all its child routes, ensuring that only logged-in users can access them.
2.  **Consistent UI Shell**: It renders the `MainNav` component, providing a consistent navigation bar across all authenticated pages.
3.  **Loading State**: It displays a global loading spinner while verifying the user's authentication status, preventing content flashes.

This layout leverages a Next.js App Router feature called "Route Groups," where the `(app)` folder acts as a logical grouping without affecting the URL structure.

## 2. Component Breakdown

### `AppLayout({ children })`

This is the layout component.

#### Props
-   `children`: The `ReactNode` representing the actual page component being rendered (e.g., `DeliveryPage`, `ProfilePage`).

#### State Management
-   **`isMounted`**: A boolean state (`useState`) that is set to `true` inside a `useEffect` hook. This is a critical piece of logic to prevent hydration errors. Since `localStorage` (used for session management) is only available on the client, this state ensures that any logic depending on it only runs after the component has "mounted" in the browser.

#### Data Hooks
-   **`useAuth()`**: Provides access to the `user` object from the `AuthContext`. This is the source of truth for the user's session.
-   **`useRouter()`**: Used to programmatically redirect unauthenticated users to the `/login` page.

#### Core Logic (in `useEffect` hooks)

1.  **Mounting Effect**:
    -   `useEffect(() => { setIsMounted(true); }, [])`
    -   This runs once when the component mounts on the client. It safely transitions `isMounted` from `false` to `true`.

2.  **Authentication Effect**:
    -   `useEffect(() => { ... }, [user, router, isMounted])`
    -   This effect runs whenever the `user` object, `router`, or `isMounted` state changes.
    -   **The Guard Logic**: It checks `if (isMounted && user === null)`.
        -   `isMounted`: Ensures this check only runs on the client-side after the initial render, avoiding server-client mismatches.
        -   `user === null`: Checks if the user is not logged in.
    -   If both conditions are true, it calls `router.push('/login')` to redirect the user.

#### Rendering Logic

-   **Loading State**: `if (!isMounted || !user)`
    -   While the component is not yet mounted on the client OR while the `user` object is still `null` (which could be during the initial check or before redirection), it renders a full-screen loading spinner. This provides a smooth UX and prevents the user from briefly seeing a flash of the protected content.
-   **Authenticated State**: If the user is authenticated (`isMounted && user` is true), it renders the main layout structure:
    -   A root `div` with flexbox styles.
    -   The `<MainNav />` component at the top.
    -   The `{children}` (the actual page content) in the main area.

## 3. Data Flow

1.  **Navigation**: A user navigates to a protected route (e.g., `/delivery`).
2.  **Layout Mount**: `AppLayout` mounts. `isMounted` is `false`, `user` is initially `null` (or read from `localStorage` by the provider). The loading spinner is shown.
3.  **Client-Side Effect**: The first `useEffect` runs, setting `isMounted` to `true`.
4.  **Auth Check Effect**: The second `useEffect` runs.
    -   **Case 1 (User Logged In)**: `user` object is present. The condition `user === null` is false. Nothing happens. The loading state condition `!user` becomes false, and the main layout with `MainNav` and the page content (`children`) is rendered.
    -   **Case 2 (User Logged Out)**: `user` is `null`. The condition `isMounted && user === null` is true. `router.push('/login')` is called. The user is redirected. The loading spinner remains visible during this brief redirection period.

## 4. How it Fits In

`AppLayout` is a foundational piece of the application's architecture. It acts as a gatekeeper for the private, authenticated sections of the app. It's an excellent example of a client-side authentication guard pattern in Next.js, correctly handling potential hydration issues by waiting for the component to mount before performing client-only checks.
