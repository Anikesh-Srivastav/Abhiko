# File Documentation: `new/page.tsx`

-   **Path**: `src/app/(app)/abigram/new/page.tsx`
-   **Component**: `NewPostPage`

## 1. Responsibility

This file defines the dedicated page for creating a new **Abigram** post. It provides a user-friendly form for users to share their dining experiences. The page is protected by the `AuthGuard`, ensuring only logged-in users can access it.

This route exists primarily as a full-page alternative to the dialog-based form on the main Abigram feed, which can be better for mobile experiences or direct linking.

## 2. Component Breakdown

### `NewPostPage()`

This is the main component for the page.

#### State Management
-   `title`, `description`, `restaurantId`, `image`, `imagePreview`: Standard React `useState` hooks to manage the form inputs.
    -   `image`: Stores the Base64 data URI of the uploaded image.
    -   `imagePreview`: Stores a temporary object URL for displaying the image preview immediately after selection.
-   `isSubmitting`: A boolean state to manage the form's submission status, used to disable the submit button and show a loader.

#### Core Functions

-   **`handleImageUpload(e)`**:
    -   Triggered when the user selects a file from the image input.
    -   Creates a temporary URL for the image preview using `URL.createObjectURL()`.
    -   Uses a `FileReader` to read the selected image file and convert it into a **Base64 data URI string**. This string is then stored in the `image` state.

-   **`handleSubmit(e)`**:
    -   Handles the form submission.
    -   Prevents the default form action.
    -   Performs validation to ensure all required fields (title, description, restaurant, image) are filled.
    -   Gets the current user from the `useAuth` hook.
    -   Constructs a new `Post` object with a unique ID and timestamp.
    -   Retrieves the current posts from `localStorage`, adds the new post to the beginning of the array, and saves it back.
    -   Displays a success toast notification.
    -   Redirects the user back to the main Abigram feed (`/abigram`) using `useRouter`.

## 3. Data Flow

1.  **User Input**: The user fills out the form fields and selects an image.
2.  **State Update**: `useState` hooks capture the form data and the Base64-encoded image.
3.  **Submission**: On submit, the collected state is bundled into a new `Post` object.
4.  **`localStorage` Interaction**: The `handleSubmit` function directly reads from and writes to the `abiko-posts` key in `localStorage`.
5.  **Redirection**: The user is navigated to `/abigram`, where the feed will re-render and display the newly added post.

## 4. How it Fits In

This page is a key part of the "Abigram" social feature. It provides the "Create" functionality in the CRUD (Create, Read, Update, Delete) model for posts. It's a self-contained, authenticated route that directly interacts with the posts data layer in `localStorage`.
