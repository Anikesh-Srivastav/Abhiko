
# File Documentation: `use-toast.ts`

-   **Path**: `src/hooks/use-toast.ts`
-   **Hook**: `useToast`
-   **Function**: `toast`

## 1. Responsibility

This file provides a complete, self-contained system for creating and managing "toast" notifications throughout the application. It is inspired by the popular `react-hot-toast` library.

Its responsibilities are:
1.  **State Management**: It manages a global state of active toasts using a reducer pattern, completely independent of React's component tree.
2.  **Imperative API**: It exposes a `toast()` function that can be called from anywhere in the application (not just within React components) to create a new notification.
3.  **React Hook**: It provides a `useToast` hook for components to subscribe to the global toast state and get the list of toasts to render.
4.  **Queueing and Dismissal**: It handles the lifecycle of a toast, including adding it, updating it, and automatically removing it from the DOM after a delay.

## 2. System Breakdown

### Constants
-   `TOAST_LIMIT`: The maximum number of toasts to show at one time (set to 1).
-   `TOAST_REMOVE_DELAY`: The time in milliseconds before a toast is removed from the DOM after being dismissed. This was changed from `500000` to `250000` to halve the timer.

### Core State and Dispatcher
-   `memoryState`: A simple JavaScript object that holds the global state (`{ toasts: [] }`). It lives outside of any React component.
-   `listeners`: An array of callback functions. Any component that uses `useToast` adds its `setState` function to this array.
-   `reducer(state, action)`: A standard reducer function that handles state transitions (`ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST`).
-   `dispatch(action)`: When called, this function runs the action through the `reducer` to get the new `memoryState`, and then iterates over the `listeners` array, calling each one to trigger a re-render in the subscribed components.

### `toast({ ...props })` Function
-   This is the main public API for creating toasts.
-   It can be called from event handlers, promises, etc.
-   **How it works**:
    1.  Generates a unique ID for the toast.
    2.  Calls `dispatch` with an `ADD_TOAST` action, passing in the toast properties and an `onOpenChange` handler.
    3.  The `onOpenChange` handler is wired to automatically `dispatch` a `DISMISS_TOAST` action when the toast's internal state changes to closed (e.g., via user interaction or timeout from the `Toast` component itself).

### `useToast()` Hook
-   This is the bridge between the external state management system and React's component world.
-   It uses `useState` to hold a local copy of the `memoryState`.
-   It uses `useEffect` to subscribe its `setState` function to the `listeners` array when it mounts and unsubscribe when it unmounts.
-   This ensures that whenever `dispatch` is called from anywhere, the component using this hook will be re-rendered with the latest list of toasts.

## 3. Data Flow

1.  **Trigger**: A component (e.g., `LoginPage`) calls `toast({ title: 'Error', ... })`.
2.  **Dispatch `ADD_TOAST`**: The `toast` function dispatches an `ADD_TOAST` action to the central `reducer`.
3.  **State Update**: `memoryState` is updated with the new toast object.
4.  **Notify Listeners**: The `dispatch` function calls all listener functions. The primary listener is the `setState` from the `useToast` hook inside the `Toaster` component (`src/components/ui/toaster.tsx`).
5.  **`Toaster` Re-renders**: The `Toaster` component's state is updated, causing it to re-render. It then maps over the new `toasts` array and displays the new toast notification on the screen.
6.  **Dismissal**:
    -   After a duration, the underlying ShadCN `Toast` component's state changes to closed.
    -   This triggers the `onOpenChange` callback that was attached in the `toast()` function.
    -   This callback dispatches `DISMISS_TOAST`.
    -   The reducer marks the toast as `open: false` and adds it to a removal queue via `addToRemoveQueue`.
    -   After `TOAST_REMOVE_DELAY`, the toast is fully removed from the state via a `REMOVE_TOAST` action.

## 4. How it Fits In

This file provides a robust, decoupled notification system. By managing state outside of the React tree, it allows for an "imperative" API (`toast(...)`) which is very convenient for triggering notifications from non-component logic (like API service files). The `useToast` hook then provides the "declarative" link needed for React to render the results. The system is rendered by the `<Toaster />` component, which is placed in the root layout to be available everywhere.
