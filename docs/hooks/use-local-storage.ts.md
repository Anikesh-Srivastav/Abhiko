
# File Documentation: `use-local-storage.ts`

-   **Path**: `src/hooks/use-local-storage.ts`
-   **Hook**: `useLocalStorage`

## 1. Responsibility

This file defines the `useLocalStorage` custom hook, a generic and reusable utility that synchronizes a React state with the browser's `localStorage`. It is a cornerstone of the application's "backend-less" architecture.

Its responsibilities are:
1.  To provide a state variable and a setter function, exactly like React's built-in `useState` hook.
2.  To automatically persist any changes to that state in `localStorage` under a specified key.
3.  To initialize its state from `localStorage` when a component first mounts, thus retrieving the persisted value.
4.  To handle server-side rendering (SSR) gracefully, where `localStorage` is not available.

## 2. Hook Breakdown

### `useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]`

This is a generic hook, meaning it can work with any data type (`<T>`).

#### Parameters
-   `key`: A `string` used as the key for storing the value in `localStorage`.
-   `initialValue`: The value to use if nothing is found in `localStorage` for the given `key`.

#### Return Value
-   An array containing two elements, mirroring the `useState` API:
    1.  `storedValue`: The current value of the state.
    2.  `setValue`: A function to update the state.

#### Core Logic

1.  **Client-Side Check**:
    -   `const isClient = typeof window !== 'undefined';`
    -   This boolean is used throughout the hook to ensure that any code attempting to access `window.localStorage` only runs in a browser environment, preventing crashes during server-side rendering.

2.  **State Initialization (`useState`)**:
    -   The hook uses a standard `useState` call but provides a function as its initial value. This function is only executed on the first render.
    -   **Inside the initializer function**:
        -   It checks `if (!isClient)`, returning `initialValue` if on the server.
        -   It wraps the `localStorage.getItem(key)` call in a `try...catch` block. This is important because `localStorage` access can fail (e.g., in private browsing modes or if storage is full).
        -   It parses the retrieved item from JSON. If `getItem` returns `null` or parsing fails, it falls back to `initialValue`.

3.  **Setter Function (`setValue`)**:
    -   This function is what the consuming component calls to update the state.
    -   It first updates the React state using `setStoredValue`.
    -   Then, it checks `if (isClient)` and proceeds to save the new value to `localStorage` using `setItem`, again wrapped in a `try...catch` block for safety. The value is converted to a JSON string before being stored.

4.  **Hydration Effect (`useEffect`)**:
    -   `useEffect(() => { ... }, [key, isClient]);`
    -   This effect runs after the component has mounted on the client. It re-checks `localStorage` for the given key.
    -   This is an important step for hydration. It ensures that after the initial server render, the client-side component's state is correctly synchronized with the value that's *actually* in the browser's `localStorage`, even if it differs from the `initialValue`.

## 3. Data Flow

1.  **Component A calls**: `const [user, setUser] = useLocalStorage('abiko-user', null);`
2.  **Initial Render (Server)**: `isClient` is `false`. The hook initializes its state to `null` (the `initialValue`). The server renders HTML based on this `null` state.
3.  **Initial Render (Client/Hydration)**: The client also initially renders with the `null` state to match the server. The `useEffect` then runs. It reads `localStorage`.
    -   If `'abiko-user'` exists in storage, `setStoredValue` is called, and the component re-renders with the persisted user data.
4.  **State Update**: The application calls `setUser({ name: 'Test' })`.
5.  **`setValue` Execution**:
    -   The internal `setStoredValue` updates the React state, triggering a re-render in Component A.
    -   The new user object is stringified and saved to `localStorage` under the key `'abiko-user'`.

## 4. How it Fits In

`useLocalStorage` is a foundational utility hook for this project. It abstracts away the complexities of interacting with `localStorage` and provides a simple, React-idiomatic API. It is the engine that powers the persistence of the user's session (`AuthProvider`) and their shopping cart (`CartProvider`), making the application feel like a real, stateful web app without requiring a backend.
