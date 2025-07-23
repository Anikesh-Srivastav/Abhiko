# Source Code File Index

This document provides a one-line summary for each source file in the project. For detailed documentation on a specific file, please refer to its corresponding `.md` file in this `docs/` directory.

## Main Application (`src/app`)

-   **`src/app/(app)/abigram/new/page.tsx`**: A dedicated page for creating a new Abigram post.
-   **`src/app/(app)/abigram/page.tsx`**: Renders the main Abigram social feed and includes the new post creation dialog.
-   **`src/app/(app)/checkout/page.tsx`**: The page where users review their cart, apply points, and proceed to payment.
-   **`src/app/(app)/delivery/[id]/page.tsx`**: Displays the menu for a specific restaurant, allowing users to add items to their cart.
-   **`src/app/(app)/delivery/page.tsx`**: The main restaurant browsing page with search and filter capabilities.
-   **`src/app/(app)/dine-in/page.tsx`**: A placeholder page for the QR-code-based dine-in feature.
-   **`src/app/(app)/layout.tsx`**: The main layout for authenticated users, including navigation and session protection.
-   **`src/app/(app)/payment/page.tsx`**: The final payment confirmation page that simulates order processing.
-   **`src/app/(app)/profile/page.tsx`**: The user's profile page, displaying their details and reward points.
-   **`src/app/globals.css`**: The global stylesheet, including Tailwind CSS directives and ShadCN theme variables.
-   **`src/app/layout.tsx`**: The root layout for the entire application, loading fonts and global providers.
-   **`src/app/login/page.tsx`**: The user login page.
-   **`src/app/page.tsx`**: The public landing page of the application.
-   **`src/app/signup/page.tsx`**: The user registration page.

## AI Flows (`src/ai`)

-   **`src/ai/dev.ts`**: The development entry point for running Genkit flows locally.
-   **`src/ai/genkit.ts`**: The central Genkit configuration file, initializing the AI plugin and model.

## Components (`src/components`)

-   **`src/components/auth-guard.tsx`**: A client-side component to protect routes that require authentication.
-   **`src/components/cart-sheet.tsx`**: The slide-out sheet component that displays the current shopping cart.
-   **`src/components/main-nav.tsx`**: The main navigation bar for authenticated sections of the app.
-   **`src/components/post-card.tsx`**: A component to display a single post in the Abigram feed.
-   **`src/components/post-skeleton.tsx`**: A skeleton loader for the post card to show while data is fetching.
-   **`src/components/restaurant-card.tsx`**: A card component to display a single restaurant in the delivery list.
-   **`src/components/theme-toggle.tsx`**: A button for switching between light and dark themes.
-   **`src/components/user-nav.tsx`**: The dropdown menu for logged-in users, providing links to profile and logout.
-   **`src/components/ui/*`**: Pre-built, reusable UI components from the ShadCN library (buttons, cards, inputs, etc.).

## Hooks (`src/hooks`)

-   **`src/hooks/use-auth.ts`**: A custom hook to easily access the `AuthContext`.
-   **`src/hooks/use-cart.ts`**: A custom hook to easily access the `CartContext`.
-   **`src/hooks/use-local-storage.ts`**: A generic hook for persisting state to `localStorage`.
-   **`src/hooks/use-mobile.tsx`**: A hook to detect if the application is being viewed on a mobile device.
-   **`src/hooks/use-posts.ts`**: A custom hook to easily access the `PostsContext`.
-   **`src/hooks/use-toast.ts`**: A hook for dispatching and managing toast notifications.

## Library & Utilities (`src/lib`)

-   **`src/lib/data.ts`**: Contains all mock data for the application (restaurants, menus, avatars).
-   **`src/lib/types.ts`**: Defines all TypeScript interfaces and types used across the application.
-   **`src/lib/utils.ts`**: Utility functions, including `cn` for merging Tailwind CSS classes.

## Providers (`src/providers`)

-   **`src/providers/app-providers.tsx`**: A single component that wraps all global context providers.
-   **`src/providers/auth-provider.tsx`**: The context provider that manages user authentication state and logic.
-   **`src/providers/cart-provider.tsx`**: The context provider that manages the shopping cart state and logic.
-   **`src/providers/posts-provider.tsx`**: The context provider that manages the Abigram posts state and logic.
-   **`src/providers/query-provider.tsx`**: The context provider for `@tanstack/react-query`.
-   **`src/providers/theme-provider.tsx`**: The context provider for managing the application's theme (light/dark).
