# File Documentation: `posts-provider.tsx`

-   **Path**: `src/providers/posts-provider.tsx`
-   **Component**: `PostsProvider`
-   **Context**: `PostsContext`

## 1. Responsibility

This file defines the `PostsProvider`, the central authority for managing the state of the **Abigram** social feed. It encapsulates all logic related to fetching, creating, and displaying posts.

Its key responsibilities are:
1.  **Managing Post State**: It holds the array of all posts (`rawPosts`) and the "enriched" version (`posts`) which includes author details.
2.  **Persistence**: It uses the `useLocalStorage` hook with the key `'abiko-posts'` to persist the raw post data across browser sessions.
3.  **Data Enrichment**: It fetches author details from `localStorage` for each post to create the `EnrichedPost` objects that the UI components consume.
4.  **Seeding Initial Data**: It contains the logic to populate the feed with mock data on the user's first visit.
5.  **Providing Post Functions**: It exposes `addPost` and `refetchPosts` functions to its children via the `PostsContext`.

## 2. Component & Context Breakdown

### `PostsContext`
-   `createContext<PostsContextType | null>(null)`: Creates the context object that components will subscribe to. The `PostsContextType` defines the shape of the context value (`posts`, `isLoading`, etc.).

### `PostsProvider({ children })`
This is the provider component that manages the state and logic.

#### State Management
-   **`rawPosts`, `setRawPosts`**: From `useLocalStorage`, this state holds the array of `Post` objects as they are stored.
-   **`posts`**: A `useState` that holds the final array of `EnrichedPost` objects, ready for rendering.
-   **`isLoading`**: A boolean state to indicate when posts are being fetched and enriched.

#### Core Functions

-   **`seedInitialData()`**: A helper function that runs once to populate `localStorage` with mock posts and mock user profiles if they don't already exist. This ensures a good first-time user experience.
-   **`loadAndEnrichPosts()`**:
    -   This is the core data processing function.
    -   It takes the `rawPosts` from `localStorage`.
    -   For each post, it looks up the author's user profile (also from `localStorage`) using the `post.userId`.
    -   It combines the post data and author data into an `EnrichedPost` object.
    -   It sorts the posts by timestamp to ensure the newest ones are first.
    -   Finally, it updates the `posts` state, which triggers a re-render in consuming components.
-   **`addPost(postData)`**:
    -   Takes the data for a new post from a form.
    -   Creates a complete `Post` object with a unique ID and a timestamp.
    -   Prepends the new post to the `rawPosts` array and saves it to `localStorage` via `setRawPosts`.
-   **`refetchPosts()`**:
    -   Manually re-reads the `abiko-posts` key from `localStorage`. This is useful for syncing state between tabs.

#### `useEffect` Hooks
-   A `useEffect` hook runs on mount to perform the initial data seeding and fetch posts.
-   A second `useEffect` hook runs whenever `rawPosts` changes (e.g., after `addPost` is called) to trigger the `loadAndEnrichPosts` function, ensuring the displayed posts are always up-to-date.

## 3. Data Flow

1.  **Provider Wrapping**: `PostsProvider` is included in `app-providers.tsx`, wrapping the entire application.
2.  **Initialization**: On app load, `PostsProvider` initializes its `rawPosts` state from `localStorage` and seeds initial data if necessary.
3.  **Enrichment**: The `useEffect` triggers `loadAndEnrichPosts`, which processes the raw data and sets the `posts` state.
4.  **Consumption**: A component like `AbigramPage` calls `const { posts, isLoading } = usePosts();` to get the display-ready data.
5.  **Action (New Post)**: A component calls `addPost(newPostData)`.
6.  **State Change**: The `addPost` function inside the provider calls `setRawPosts` with the new array.
7.  **`useLocalStorage` & Re-render**:
    a.  The `useLocalStorage` hook saves the new `rawPosts` array to `localStorage`.
    b.  The change to `rawPosts` triggers the `useEffect` that calls `loadAndEnrichPosts` again.
    c.  `loadAndEnrichPosts` updates the `posts` state.
    d.  The change in the `posts` state causes all components using `usePosts` to re-render with the new data.

## 4. How it Fits In

The `PostsProvider` centralizes all state management and business logic for the Abigram feature. It follows the same robust provider pattern as `AuthProvider` and `CartProvider`, creating a single source of truth for post data. This architecture makes the UI components (`AbigramPage`, `PostCard`) cleaner and focused only on presentation, while the provider handles the complexities of data persistence, enrichment, and updates.
