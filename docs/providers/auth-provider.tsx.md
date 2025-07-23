
# File Documentation: `auth-provider.tsx`

-   **Path**: `src/providers/auth-provider.tsx`
-   **Component**: `AuthProvider`
-   **Context**: `AuthContext`

## 1. Responsibility

This file is the core of the application's authentication system. It defines the `AuthProvider` component, which uses React Context to provide authentication state and related functions to the entire application.

Its key responsibilities are:
1.  **Managing User State**: It holds the current `user`'s session data.
2.  **Persistence**: It uses the `useLocalStorage` hook to persist the user's session (`abiko-user-session`) and user credentials (`abiko-users`) across browser refreshes.
3.  **Providing Auth Functions**: It exposes the functions for `login`, `logout`, `signup`, and `updateUser`.
4.  **Handling Business Logic**: It contains the actual logic for authenticating users, creating new accounts, and updating profiles against the data stored in `localStorage`.
5.  **Managing Reward Points**: It includes functions to add and spend user reward points, ensuring the changes are persisted.

## 2. Component & Context Breakdown

### `AuthContext`
-   `createContext<AuthContextType | null>(null)`: This creates the context object that components will subscribe to. It is initialized to `null`. The `AuthContextType` interface defines the shape of the context's value.

### `AuthProvider({ children })`
This is the provider component that does all the work.

#### Data Hooks & State
-   **`useLocalStorage`**:
    -   `user`: Stores the currently logged-in `User` object or `null`. Key: `'abiko-user-session'`.
    -   `users`: Stores a record of registered users' emails and passwords (`Record<string, string>`). Key: `'abiko-users'`. This acts as a mock user credentials table.
-   **`useRouter`**: Used for programmatic redirection after login, signup, or logout.
-   **`useToast`**: Used to display success or error notifications.

#### Core Functions

-   **`login(email, password)`**:
    -   Checks if the provided `email` and `password` match the records in the `users` state.
    -   If successful, it retrieves the full user profile from another `localStorage` key (`abiko-user-profile-${email}`), sets the `user` state, and redirects to `/delivery`.
    -   Also saves the user profile by ID (`abiko-user-profile-by-id-${id}`) for easier lookups by other parts of the app (like the Abigram feed).
    -   If it fails, it shows a destructive toast.

-   **`signup(userData)`**:
    -   Checks if the email already exists.
    -   If not, it creates a new `User` object with a unique ID and 0 points.
    -   It saves the new user's credentials to the `users` state and the full profile to `localStorage` (both by email and by ID).
    -   It sets the new user as the active session and redirects.

-   **`logout()`**:
    -   Sets the `user` state to `null`.
    -   Redirects to the `/login` page.

-   **`updateUser(newProfileData)`**:
    -   Merges the new profile data with the existing `user` object.
    -   Updates the `user` state.
    -   Updates the user profile in `localStorage` (both by email and by ID).

-   **`addPoints(pointsToAdd)` / `spendPoints(pointsToSpend)`**:
    -   Calculates the new point balance.
    -   Updates the `user` state with the new balance.
    -   Calls a helper `updatePointsInStorage` to persist the change.

## 3. Data Flow

1.  **Provider Wrapping**: `AuthProvider` is wrapped around the application in `app-providers.tsx`.
2.  **Initialization**: On app load, `AuthProvider` initializes its state by reading from `localStorage` via the `useLocalStorage` hooks. If a session exists, the `user` state is immediately populated.
3.  **Consumption**: A component like `LoginPage` calls `const { login } = useAuth()`.
4.  **Action**: The user submits the login form. The `login` function is called.
5.  **Internal Logic**: The `login` function inside `AuthProvider` performs its logic, checking credentials against its `users` state.
6.  **State Change**: If successful, it calls `setUser(retrievedUser)`.
7.  **Re-render**: The change in the `user` state triggers a re-render in `AuthProvider`. Because the `value` prop of the `AuthContext.Provider` has now changed, **all components that consume this context (i.e., that use the `useAuth` hook) will also re-render** with the new `user` data.
8.  **Persistence**: The `useLocalStorage` hook automatically handles saving the new `user` session state to `localStorage`.

## 4. How it Fits In

The `AuthProvider` is the central authority for all things related to user identity and session management in the application. It encapsulates all the complex logic and state management, providing a clean and simple API (`useAuth`) to the rest of the app. This is a prime example of the Provider pattern in React, creating a single source of truth for authentication state and preventing prop-drilling.
