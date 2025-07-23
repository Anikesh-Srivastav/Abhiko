
# File Documentation: `abigram/page.tsx`

-   **Path**: `src/app/(app)/abigram/page.tsx`
-   **Component**: `AbigramPage`, `NewPostForm`
-   **Type**: `EnrichedPost`

## 1. Responsibility

This file is the heart of the **Abigram** social feature. It is responsible for:
1.  Fetching and displaying all user-generated posts in a feed format.
2.  Enriching post data with author information (name and avatar).
3.  Providing the primary user interface for creating a new post via a dialog window.
4.  Seeding initial mock data into `localStorage` on the first visit to populate the feed.

## 2. Component & Function Breakdown

### Helper Functions

-   **`getPostsFromStorage()`**: Safely reads the `abiko-posts` key from `localStorage` and parses the JSON into an array of `Post` objects. Returns an empty array if `localStorage` is not available or the key doesn't exist.
-   **`getUserFromStorage(userId)`**: Safely reads a user's profile from `localStorage` using a key pattern (`abiko-user-profile-by-id-${userId}`). This is crucial for enriching post data.
-   **`seedInitialData()`**: A one-time function that populates `localStorage` with mock posts and mock users if it hasn't been done before. This ensures first-time users see a populated feed.

### `NewPostForm({ onPostCreated })` Component

A form component wrapped in a ShadCN `Dialog` for creating a new post.

-   **Props**: `onPostCreated` is a callback function that is triggered after a post is successfully created, allowing the parent `AbigramPage` to refresh its post list.
-   **State**: Manages form inputs (`title`, `description`, etc.) and submission state (`isSubmitting`).
-   **Functionality**:
    -   Handles image uploads by converting the file to a Base64 data URI for storage.
    -   On submission, it validates input, gets the current user's ID from `useAuth`, constructs a new `Post` object, and prepends it to the existing posts array in `localStorage`.
    -   Closes the dialog and calls `onPostCreated()` to signal a refresh.

### `AbigramPage()` Component

The main page component.

-   **State**:
    -   `posts`: An array of `EnrichedPost` objects. The `EnrichedPost` type extends the base `Post` with an `author` object containing the user's `fullName` and `avatar`.
    -   `isLoading`: A boolean to manage the loading state and display skeletons.
-   **Core Logic**:
    -   **`loadAndEnrichPosts()`**: This is the key data-fetching function. It:
        1.  Calls `getPostsFromStorage()` to get the raw post data.
        2.  Maps over each post and calls `getUserFromStorage()` for each `post.userId`.
        3.  Combines the post data and user data into an `EnrichedPost` object.
        4.  Updates the `posts` state with the enriched data.
    -   **`useEffect`**: On component mount, it calls `seedInitialData()` and then `loadAndEnrichPosts()` to populate the feed.
-   **Rendering**:
    -   Displays `PostSkeleton` components if `isLoading` is true.
    -   If not loading and there are no posts, it shows an empty state message.
    -   If posts exist, it maps over the `posts` array and renders a `PostCard` for each one.

## 3. Data Flow

1.  **Page Load**: `useEffect` triggers `seedInitialData()` (if needed) and `loadAndEnrichPosts()`.
2.  **Data Fetching**: `loadAndEnrichPosts()` reads from two `localStorage` keys: `abiko-posts` and `abiko-user-profile-by-id-*`.
3.  **Data Transformation**: The raw post data is "joined" with user data to create the `EnrichedPost` array.
4.  **State Update**: The `posts` state is set, causing the page to re-render.
5.  **Rendering**: The `posts` array is passed down to `PostCard` components for display.
6.  **Post Creation**:
    -   The user interacts with `NewPostForm`.
    -   `NewPostForm` writes a new post directly to `localStorage`.
    -   It then calls the `onPostCreated` callback, which re-triggers `loadAndEnrichPosts()` on the `AbigramPage`.
    -   This re-fetches, re-enriches, and re-renders the feed with the new post at the top.

## 4. How it Fits In

This page is the central hub for the app's social dimension. It demonstrates a complete client-side CRUD (Create, Read) cycle using `localStorage` as a database. The data enrichment process (`loadAndEnrichPosts`) is a good example of how related data (posts and users) would be joined in a real application, whether on the client or server.
