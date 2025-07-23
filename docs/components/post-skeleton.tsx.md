
# File Documentation: `post-skeleton.tsx`

-   **Path**: `src/components/post-skeleton.tsx`
-   **Component**: `PostSkeleton`

## 1. Responsibility

This file defines the `PostSkeleton` component, which serves as a loading placeholder for the `PostCard`. It mimics the layout and structure of a `PostCard` but uses shimmering, grayed-out shapes (`Skeleton` components) instead of actual content.

Its primary responsibility is to improve the user experience by providing an immediate visual structure while the actual post data is being fetched from the data source. This prevents jarring layout shifts and gives the user a sense of progress.

## 2. Component Breakdown

### `PostSkeleton()`

This is a simple, stateless functional component. It takes no props.

#### Rendering Logic
The component is built using a `Card` component to match the `PostCard`'s container. Inside, it uses several `Skeleton` components from ShadCN, each styled to approximate the size and position of the real content:
-   **Header**:
    -   A round `Skeleton` for the author's avatar (`h-10 w-10 rounded-full`).
    -   Two rectangular `Skeleton`s of different widths to represent the author's name and the post timestamp.
-   **Image**: A large rectangular `Skeleton` (`w-full h-[400px]`) to represent the main post image.
-   **Content**: `Skeleton`s for the post title and the multi-line description.
-   **Footer**: A single `Skeleton` to represent the button linking to the restaurant.

Each `Skeleton` component has a built-in pulsing animation (`animate-pulse`) to create the classic "shimmer" loading effect.

## 3. Data Flow

The `PostSkeleton` component is entirely presentational and does not handle any data itself. Its role in the data flow is to be displayed *before* the data arrives.

1.  **Parent Component (`AbigramPage`)**:
    -   The page initiates a data fetch. Its `isLoading` state is `true`.
2.  **Conditional Rendering**: The parent component contains a ternary operator:
    ```jsx
    {isLoading ? <PostSkeleton /> : <PostCard post={post} />}
    ```
3.  **Display**: While `isLoading` is `true`, one or more instances of `PostSkeleton` are rendered.
4.  **Data Arrival**: Once the data fetch is complete, the parent's `isLoading` state becomes `false`.
5.  **Component Swap**: The parent component re-renders, and the `PostSkeleton` is replaced by the actual `PostCard` component, which is now populated with real data.

## 4. How it Fits In

`PostSkeleton` is a crucial part of creating a modern, professional-feeling user interface. It is a key player in the "skeleton loading" UX pattern. By providing a low-fidelity preview of the content structure, it makes the application feel faster and more responsive, even when network requests are slow.

It is a perfect example of a single-purpose, purely presentational component that supports the data-fetching logic of a "smarter" parent component.
