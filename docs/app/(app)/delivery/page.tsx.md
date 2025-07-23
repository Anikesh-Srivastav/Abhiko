
# File Documentation: `delivery/page.tsx`

-   **Path**: `src/app/(app)/delivery/page.tsx`
-   **Component**: `DeliveryPage`

## 1. Responsibility

This file defines the main restaurant browsing page for the delivery service. It is the central hub where users can discover, search, and filter restaurants. Its key responsibilities are:
1.  Fetching the list of all available restaurants.
2.  Displaying the restaurants in a grid of cards.
3.  Providing UI controls for searching by restaurant name and filtering by cuisine type.
4.  Handling loading states by showing skeleton UI elements while data is being fetched.
5.  Displaying a message if no restaurants match the search/filter criteria.

## 2. Component Breakdown

### `DeliveryPage()`

This is the main component for the page.

#### State Management
-   **`searchTerm`**: A string state (`useState`) to hold the current value of the search input field.
-   **`cuisineFilter`**: A string state (`useState`) to hold the currently selected cuisine from the dropdown filter.

#### Data Fetching
-   **`useQuery`**: This hook from `@tanstack/react-query` is used to fetch the restaurant data.
    -   `queryKey: ['restaurants']`: A unique key to identify this data in the cache.
    -   `queryFn: fetchRestaurants`: The asynchronous function that performs the data fetching.
-   **`fetchRestaurants`**: An async function that simulates an API call by returning the `RESTAURANTS` mock data from `src/lib/data.ts` after a 500ms delay. In a real application, this function would contain a `fetch` or `axios` call to a backend API.
-   **`isLoading`**: A boolean value returned by `useQuery` that is `true` while `fetchRestaurants` is in progress.

#### Core Logic

-   **Filtering Logic**:
    -   `filteredRestaurants` is a derived array. It's computed on every render by taking the original `restaurants` data and applying two filters:
        1.  **Search**: It checks if a restaurant's name (converted to lowercase) includes the `searchTerm` (also converted to lowercase).
        2.  **Cuisine**: It checks if the `cuisineFilter` is set to "all" or if the restaurant's cuisine matches the selected filter.
-   **Dynamic Cuisine List**:
    -   `uniqueCuisines` is another derived array, created by creating a `Set` from the cuisines of all restaurants. This ensures the filter dropdown is always populated with available cuisine types without hardcoding them.

#### Rendering

-   **Loading State**: If `isLoading` from `useQuery` is true, the component renders a grid of `Skeleton` components, providing a good user experience while data is loading.
-   **Data Display**: If loading is complete, it maps over the `filteredRestaurants` array and renders a `RestaurantCard` component for each restaurant.
-   **Empty State**: If `filteredRestaurants` is empty and loading is complete, it renders a "No Restaurants Found" message, giving clear feedback to the user.

## 3. Data Flow

1.  **Component Mount**: The `DeliveryPage` component mounts.
2.  **`useQuery` Trigger**: `@tanstack/react-query` automatically calls the `fetchRestaurants` function.
3.  **Loading**: `isLoading` becomes `true`. The skeleton UI is rendered.
4.  **Data Fetching**: `fetchRestaurants` simulates fetching data and returns the list of restaurants after a delay.
5.  **`useQuery` Success**: `useQuery` caches the data and sets `isLoading` to `false`. The `restaurants` variable is now populated.
6.  **Re-render**: The component re-renders with the fetched data.
7.  **User Interaction**:
    -   The user types in the search `Input` or selects from the `Select` filter.
    -   `setSearchTerm` or `setCuisineFilter` is called, updating the component's state.
8.  **Re-render and Re-filter**: The component re-renders again. The `filteredRestaurants` array is re-calculated based on the new `searchTerm` or `cuisineFilter`, and the displayed list of restaurants updates instantly.

## 4. How it Fits In

This page serves as the entry point for the food delivery flow. It demonstrates best practices for modern data fetching in a React application:
-   Using a dedicated library (`@tanstack/react-query`) to handle fetching, caching, and loading states.
-   Separating data fetching logic (`fetchRestaurants`) from the component.
-   Implementing client-side search and filtering on the fetched data.
-   Providing excellent UX with skeleton loaders and clear empty states.
