
# File Documentation: `data.ts`

-   **Path**: `src/lib/data.ts`

## 1. Responsibility

This file serves as the **mock database** for the entire application. It contains all the static data that would typically be fetched from a backend API or a database in a production environment.

Its key responsibilities are:
1.  To provide a consistent and realistic set of data for restaurants, menus, user avatars, and posts.
2.  To define the shape of the data that the rest of the application expects, acting as a reference for the TypeScript types defined in `src/lib/types.ts`.
3.  To enable the development and testing of the application's frontend features in complete isolation, without any dependency on a live backend.

## 2. Data Structures

### `AVATARS: string[]`
-   A simple array of strings, where each string is a URL to a placeholder avatar image.
-   This is used during user sign-up and for populating user profiles, allowing users to choose a visual identity.

### `RESTAURANTS: Restaurant[]`
-   This is the most complex data structure in the file. It is an array of `Restaurant` objects.
-   Each `Restaurant` object contains:
    -   `id`: A unique identifier for the restaurant (e.g., `'r1'`).
    -   `name`: The restaurant's name.
    -   `location`: The city and state.
    -   `image`: A URL for the restaurant's main image.
    -   `cuisine`: The type of cuisine (e.g., 'North Indian', 'Bengali').
    -   **`menu: MenuItem[]`**: An array of `MenuItem` objects, representing that restaurant's menu.
-   Each `MenuItem` object contains:
    -   `id`: A unique identifier for the menu item (e.g., `'m1'`).
    -   `name`: The name of the dish.
    -   `image`: A URL for the dish's image.
    -   `description`: A short description of the dish.
    -   `price`: The price of the dish, as a number.

## 3. Data Flow

`data.ts` is a passive source of data. It does not perform any actions; it only exports constants that are imported and used by other parts of the application.

-   **Restaurant & Menu Data**:
    -   Imported by `src/app/(app)/delivery/page.tsx` to display the list of all restaurants.
    -   Imported by `src/app/(app)/delivery/[id]/page.tsx` to find a specific restaurant by its `id` and display its menu.
-   **Avatar Data**:
    -   Imported by `src/app/signup/page.tsx` and `src/app/(app)/profile/page.tsx` to render the avatar selection radio group.
-   **Post Data**:
    -   The mock posts and users were previously here but were moved into the `seedInitialData` function in `src/app/(app)/abigram/page.tsx` to be created dynamically in `localStorage`. This file now focuses on the more "static" data like restaurant menus.

## 4. How it Fits In

`data.ts` is a critical file for the development of this application. It effectively decouples the frontend from the backend. By providing a rich, structured set of mock data, it allows developers to build and test the entire user interface and user experience—from browsing and ordering to social posting—without needing to run a separate server or database.

When the time comes to connect to a real backend, this file serves as a clear "schema" or contract. The API endpoints would be designed to return data in the same shape as the objects defined here (`Restaurant`, `MenuItem`), making the transition from mock data to live data smooth and predictable.
