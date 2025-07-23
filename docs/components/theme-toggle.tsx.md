
# File Documentation: `theme-toggle.tsx`

-   **Path**: `src/components/theme-toggle.tsx`
-   **Component**: `ThemeToggle`

## 1. Responsibility

This file defines the `ThemeToggle` component, a simple button that allows users to switch between the application's light and dark themes.

Its responsibilities are:
1.  Providing a user interface (a button with an icon) for theme switching.
2.  Interacting with the `next-themes` library to programmatically change the theme.
3.  Displaying the correct icon (sun or moon) corresponding to the current theme.

## 2. Component Breakdown

### `ThemeToggle()`

This is a stateless functional component.

#### Data Hooks
-   **`useTheme()`**: This is a hook from the `next-themes` library. It provides access to:
    -   `theme`: A string representing the currently active theme (e.g., "light", "dark", "system").
    -   `setTheme`: A function to change the active theme.

#### Core Logic
-   **`toggleTheme()`**: A simple function that checks the current `theme` value. If it's "dark," it calls `setTheme('light')`; otherwise, it calls `setTheme('dark')`.

#### Rendering
-   The component renders a single `Button` from ShadCN with `variant="ghost"` and `size="icon"` for a clean, minimal look.
-   It contains two icons from `lucide-react`: `<Sun />` and `<Moon />`.
-   **Icon Switching**: The visibility of the sun and moon icons is controlled by Tailwind CSS classes that are applied based on the theme.
    -   **Sun Icon**: `rotate-0 scale-100 dark:-rotate-90 dark:scale-0`
        -   In light mode (no `.dark` class on parent), it's visible (`rotate-0 scale-100`).
        -   In dark mode, it rotates and scales down to zero, effectively hiding it.
    -   **Moon Icon**: `absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100`
        -   In light mode, it's hidden (`rotate-90 scale-0`).
        -   In dark mode, it becomes visible (`dark:rotate-0 dark:scale-100`).
-   An accessible `<span>` with the `sr-only` class is included for screen readers.

## 3. Data Flow

1.  **Component Load**: The `ThemeToggle` component renders.
2.  **Context Reading**: The `useTheme()` hook reads the current theme from the `ThemeProvider` context.
3.  **Icon Display**: The component displays the sun or moon icon based on the current `theme` value via CSS.
4.  **User Interaction**: The user clicks the button.
5.  **Function Call**: The `onClick` handler calls the `toggleTheme` function.
6.  **State Change**: `toggleTheme` calls `setTheme('newTheme')`.
7.  **`ThemeProvider` Action**: The `ThemeProvider` from `next-themes` updates its internal state and adds or removes the `dark` class from the `<html>` element of the document.
8.  **CSS Application**: The browser applies the new set of CSS variables defined in `globals.css` under the `.dark` selector.
9.  **Re-render**: The `ThemeToggle` component re-renders because the `theme` value from `useTheme()` has changed, and the icons update accordingly. The entire application's appearance changes instantly.

## 4. How it Fits In

`ThemeToggle` is a small but important user-facing utility. It's a self-contained component that provides a crucial piece of modern web application functionality. It's a perfect example of how to interact with a context provider (`ThemeProvider`) to effect a global change across the entire application.
