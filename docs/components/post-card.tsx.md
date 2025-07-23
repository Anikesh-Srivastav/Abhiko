
# File Documentation: `post-card.tsx`

-   **Path**: `src/components/post-card.tsx`
-   **Component**: `PostCard`

## 1. Responsibility

This file defines the `PostCard` component, which is a reusable UI element responsible for displaying a single post within the **Abigram** social feed. It neatly encapsulates all the information related to one post in a visually appealing card format.

Its key responsibilities are:
1.  Displaying the post author's avatar and full name.
2.  Showing a human-readable timestamp for the post (e.g., "about 2 hours ago").
3.  Displaying the main post image, title, and description.
4.  Providing a link to the restaurant mentioned in the post.
5.  Showing social interaction buttons (like, comment) with placeholder counts.

## 2. Component Breakdown

### `PostCard({ post })`

#### Props
-   `post`: An object of type `EnrichedPost`. The `EnrichedPost` type is crucial as it contains not only the post's data but also the pre-joined author's `fullName` and `avatar`.

#### Helper Function
-   **`getInitials(name)`**: A utility function to generate fallback initials from a full name (e.g., "Aarav Sharma" -> "AS") for the `AvatarFallback` component.

#### Core Logic

-   **Memoized Timestamp**:
    -   `const timeAgo = useMemo(() => { ... }, [post.timestamp])`
    -   This uses the `useMemo` hook to calculate the human-readable timestamp using `formatDistanceToNow` from the `date-fns` library.
    -   `useMemo` ensures that this calculation is only re-run if the `post.timestamp` prop changes, which is a performance optimization that prevents recalculating on every render.
-   **Random Interaction Counts**:
    -   `Math.floor(Math.random() * 50)` is used to generate placeholder numbers for likes and comments. This is purely for visual mock-up purposes.

#### Rendering
-   **`CardHeader`**: Displays the author's `Avatar` (with `AvatarImage` and `AvatarFallback`), full name, and the calculated `timeAgo` timestamp.
-   **Image**: The post's main image is rendered within a container that maintains a square aspect ratio (`aspect-square`). It uses the `next/image` component for optimization.
-   **`CardContent`**: Displays the post's `title` and `description`.
-   **`CardFooter`**:
    -   Contains a `Button` that links directly to the restaurant's menu page (`/delivery/${post.restaurantId}`), making the post actionable.
    -   Includes placeholder buttons for "Like" and "Comment," wrapped in `TooltipProvider` to show a "Functionality is being cooked" message on hover. This is a nice UX touch for unimplemented features.

## 3. Data Flow

1.  **Data Ingestion**: The `PostCard` receives a single, complete `post` object of type `EnrichedPost` as its prop from the parent component (e.g., `AbigramPage`).
2.  **Data Transformation**:
    -   The `post.timestamp` string is transformed into the `timeAgo` string (e.g., "2 days ago").
    -   The `post.author.fullName` is used to generate `initials` for the avatar fallback.
3.  **Display**: The component renders the data from the `post` prop in the appropriate sections of the card.
4.  **User Interaction**: The user can click the restaurant link to navigate away or hover over the action buttons to see the tooltips. The component itself does not manage any state changes; it is purely presentational.

## 4. How it Fits In

The `PostCard` is a classic example of a "dumb" or "presentational" component. It receives all the data it needs via props and is solely responsible for rendering that data in a consistent way. This makes it highly reusable, predictable, and easy to test.

It's a key building block of the Abigram feed. The parent page (`AbigramPage`) is responsible for the "smart" logic of fetching and preparing the `EnrichedPost` data, while the `PostCard` just needs to worry about how to display it. This separation of concerns is a cornerstone of clean React architecture.
