
# File Documentation: `RootLayout`

-   **Path**: `src/app/layout.tsx`
-   **Component**: `RootLayout`

## 1. Responsibility

This is the **root layout** of the Next.js application. It is the top-level component that wraps every single page. It's rendered once and persists across all page navigations.

Its primary responsibilities are:
1.  **Defining the HTML Shell**: It sets up the fundamental `<html>` and `<body>` tags for the entire application.
2.  **Loading Global Assets**: It loads global CSS (`globals.css`) and custom fonts from Google Fonts.
3.  **Providing Global Context**: It wraps all children with the `AppProviders` component, which in turn provides all the necessary React Contexts (Theme, Auth, Cart, etc.) to the entire component tree.
4.  **Setting Metadata**: It defines the default metadata for the application, such as the title and description, which is important for SEO and browser tab display.
5.  **Rendering the Toaster**: It includes the `<Toaster />` component so that toast notifications can be displayed anywhere in the app.

## 2. Component Breakdown

### `RootLayout({ children })`

#### Props
-   `children`: The `ReactNode` representing the content of the currently active page.

#### Metadata
-   **`metadata: Metadata`**: A Next.js-specific object that configures the page's `<head>` tag.
    -   `title`: "Abhiko" - Sets the default title for all pages.
    -   `description`: A brief description of the application.

#### Rendering Logic

The component returns the basic HTML structure:
-   `<html lang="en" suppressHydrationWarning>`:
    -   `lang="en"`: Sets the document language for accessibility.
    -   `suppressHydrationWarning`: This is important when using `next-themes` because the theme (`light`/`dark` class) might differ between the server-rendered HTML and the initial client render, which would normally cause a warning. This prop tells React to ignore that specific mismatch.
-   `<head>`:
    -   It includes `<link>` tags to connect to Google Fonts and preload the 'Playfair Display' and 'PT Sans' font files for better performance.
-   `<body>`:
    -   The `cn()` utility is used to apply base classes: `font-body` (setting the default font from Tailwind config) and `antialiased`.
    -   **`AppProviders`**: This is the most critical part. It wraps the `{children}`. `AppProviders` is a component that bundles all the individual context providers (`ThemeProvider`, `AuthProvider`, `CartProvider`, etc.). By placing it here, every component in the application, no matter how deeply nested, can access these global contexts.
    -   **`Toaster`**: Placed inside the `AppProviders` but outside the main `{children}`. This ensures the toast notification system is available globally and renders on top of all other content.

## 3. Data Flow

The `RootLayout` doesn't have a complex data flow itself, but it is the **source** of all context-based data flow in the application.

1.  **Initialization**: When the app loads, `RootLayout` renders.
2.  **Provider Instantiation**: `AppProviders` is rendered, which in turn instantiates `ThemeProvider`, `AuthProvider`, `CartProvider`, and `QueryProvider`.
3.  **State Initialization**: Each provider initializes its own state. For example, `AuthProvider` will attempt to read the user session from `localStorage`.
4.  **Context Availability**: The states managed by these providers are now available to any child component via their respective hooks (`useTheme`, `useAuth`, `useCart`).
5.  **Page Rendering**: The `children` (the actual page content) are then rendered within this provider-rich environment, allowing them to access global state immediately.

## 4. How it Fits In

The `RootLayout` is the bedrock of the application's structure and state management strategy. It's the highest-level component you can control in a Next.js App Router application. Its main purpose is to set up the global environment—styles, fonts, and state providers—so that all other pages and components can operate within a consistent and predictable context.
