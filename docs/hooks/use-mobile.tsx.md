
# File Documentation: `use-mobile.tsx`

-   **Path**: `src/hooks/use-mobile.tsx`
-   **Hook**: `useIsMobile`

## 1. Responsibility

This file defines the `useIsMobile` custom hook. Its sole purpose is to determine if the application is currently being viewed on a "mobile" device, based on the browser's viewport width.

This hook is essential for creating responsive layouts and enabling device-specific functionality in a clean, declarative way within React components.

## 2. Hook Breakdown

### `useIsMobile()`

This is the custom hook. It takes no parameters.

#### State Management
-   **`isMobile`**: A state variable (`useState<boolean | undefined>`) that holds the result of the check. It is initialized to `undefined`.
    -   The `undefined` initial state is crucial for server-side rendering (SSR). On the server, there is no `window` object and no screen width to measure, so the mobile status is unknown. This prevents hydration mismatches between the server-rendered and client-rendered HTML.

#### Core Logic (`useEffect` Hook)

-   `useEffect(() => { ... }, [])`: The logic is placed within a `useEffect` with an empty dependency array, so it runs only once after the component has mounted on the client.
-   **`window.matchMedia`**: This is the core browser API used. `window.matchMedia(\`(max-width: ${MOBILE_BREAKPOINT - 1}px)\`)` creates a media query list object that checks if the viewport width is less than the defined `MOBILE_BREAKPOINT` (768px).
-   **Initial Check**:
    -   `setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)`: Immediately upon mounting, it performs an initial check of the window's width and sets the `isMobile` state accordingly.
-   **Event Listener**:
    -   `mql.addEventListener("change", onChange)`: It attaches an event listener to the media query list. The `onChange` function will be called automatically by the browser whenever the viewport width crosses the 768px threshold (e.g., when a user resizes their browser window or rotates their tablet).
    -   The `onChange` function simply re-calculates the `isMobile` status and updates the state.
-   **Cleanup Function**:
    -   `return () => mql.removeEventListener("change", onChange)`: This is the cleanup function for the `useEffect`. It's called when the component unmounts. It removes the event listener to prevent memory leaks.

## 3. Data Flow

1.  **Component Mount (Server)**: A component calls `useIsMobile()`. The hook returns `undefined`. The component renders its initial HTML based on this unknown state.
2.  **Component Mount (Client/Hydration)**: The component renders on the client, and `useIsMobile` still returns `undefined` initially to match the server.
3.  **`useEffect` Runs**: After mounting, the `useEffect` inside the hook executes.
4.  **State Update**: It checks the `window.innerWidth` and calls `setIsMobile` with `true` or `false`.
5.  **Re-render**: The component using the hook re-renders now that `isMobile` has a defined boolean value. The UI can now adapt (e.g., by rendering a mobile-specific layout).
6.  **Resize Event**: If the user resizes their browser across the 768px breakpoint, the `"change"` event fires, the `onChange` callback updates the `isMobile` state again, and the component re-renders to reflect the new layout.

## 4. How it Fits In

`useIsMobile` is a powerful utility for building responsive applications. It encapsulates the browser's media query logic into a simple boolean flag that can be used directly in component rendering logic.

In this project, it is used prominently in `src/app/(app)/dine-in/page.tsx` to display different placeholder messages for mobile and desktop users, showcasing its ability to enable device-specific user experiences.

**Example Usage:**
```jsx
const isMobile = useIsMobile();

if (isMobile === undefined) {
  return null; // Or a loader, to avoid SSR mismatch
}

return isMobile ? <MobileComponent /> : <DesktopComponent />;
```
