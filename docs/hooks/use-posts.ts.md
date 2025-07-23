# File Documentation: `use-posts.ts`

-   **Path**: `src/hooks/use-posts.ts`
-   **Hook**: `usePosts`

## 1. Responsibility

This file defines the `usePosts` custom hook. Its purpose is to provide a clean, type-safe, and centralized way for components to access the `PostsContext`.

This pattern is consistent with `useAuth` and `useCart`, offering several advantages:
1.  **Abstraction**: Components do not need to import or reference `PostsContext` directly.
2.  **Error Handling**: It includes a runtime check to ensure that any component using this hook is a child of `PostsProvider`, throwing a clear error if it's not. This prevents common bugs and speeds up development.
3.  **Simplicity & Readability**: It simplifies component code, making it more declarative and easier to understand (e.g., `const { posts, addPost } = usePosts();`).

## 2. Hook Breakdown

### `usePosts()`

This is the custom hook.

#### Core Logic
1.  **`const context = useContext(PostsContext)`**: It calls the built-in React `useContext` hook with `PostsContext` to get the value from the nearest `PostsProvider` in the component tree. This value is an object containing `posts`, `isLoading`, `addPost`, and `refetchPosts`.
2.  **`if (!context)`**: It checks if the context is missing (i.e., `null` or `undefined`). This happens if a component tries to call `usePosts` outside of the `PostsProvider`.
3.  **`throw new Error(...)`**: If the context is missing, it throws an error with a helpful message, immediately alerting the developer to the issue in their component structure.
4.  **`return context`**: If the context is available, it is returned to the calling component. The return value is typed as `PostsContextType`, providing full TypeScript autocompletion and type-checking.

## 3. Data Flow

The `usePosts` hook is a **consumer** of the data and functions provided by `PostsProvider`.

1.  **`PostsProvider`**: Provides the context value, including the `posts` state and functions like `addPost`.
2.  **Component**: A component that needs to interact with post data (e.g., `AbigramPage`, `NewPostForm`) calls `usePosts()`.
3.  **`usePosts`**: The hook accesses the context provided by `PostsProvider`.
4.  **Return Value**: The hook returns the entire context object to the component.
5.  **Component Usage**: The component can then destructure the properties it needs, for example: `const { posts, isLoading, refetchPosts } = usePosts();`.

## 4. How it Fits In

`usePosts` is the official public API for interacting with the Abigram post system from within React components. It decouples the UI components from the implementation details of the `PostsContext`, making the system more modular and maintainable. Any component that needs to display posts or create a new one will use this hook, ensuring a consistent approach to state management for this feature.
