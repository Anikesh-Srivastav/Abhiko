
# File Documentation: `login/page.tsx`

-   **Path**: `src/app/login/page.tsx`
-   **Component**: `LoginPage`

## 1. Responsibility

This file defines the user login page. It is a public-facing route where existing users can authenticate to gain access to the protected sections of the application.

Its key responsibilities are:
1.  Providing a clean and simple form for users to enter their email and password.
2.  Using `react-hook-form` and `Zod` for client-side form validation.
3.  Calling the authentication logic from `useAuth` upon successful form submission.
4.  Displaying a link for users to navigate to the sign-up page if they don't have an account.

## 2. Component Breakdown

### `LoginPage()`

This is the main component for the page.

#### Form Management
-   **`useForm`**: This hook from `react-hook-form` initializes and manages the login form.
    -   **`resolver: zodResolver(formSchema)`**: Integrates a Zod schema (`formSchema`) for validation. `formSchema` requires a valid email and a non-empty password.
    -   **`defaultValues`**: Sets the initial values for the form fields to empty strings.

#### Data Hooks
-   **`useAuth()`**: Provides access to the `login` function from the `AuthContext`.

#### Core Logic

-   **Form Submission**:
    -   **`onSubmit(values)`**: This function is the handler for the form's submission. It's only called by `react-hook-form` if the inputs pass the Zod validation defined in `formSchema`.
    -   It receives the `values` object (containing the email and password) and calls the `login(values.email, values.password)` function from the `useAuth` hook.
    -   The `login` function itself handles the logic of verifying credentials, setting the user state, and redirecting upon success or showing a toast on failure.

#### Rendering
-   The page layout is a single, centered card (`Card`) for a focused user experience.
-   It includes a link to the home page via the "Abhiko" logo.
-   The `<Form>` component from ShadCN wraps the form fields, integrating with `react-hook-form`.
-   **`FormField`**: Each input is wrapped in a `FormField` component, which connects it to the `useForm` state and handles rendering validation messages (`FormMessage`).
-   A link to `/signup` is provided for new users.

## 3. Data Flow

1.  **User Input**: The user types their email and password into the `Input` fields. `react-hook-form` controls the state of these inputs.
2.  **Submission**: The user clicks the "Login" button.
3.  **Client-Side Validation**: `react-hook-form` and `Zod` validate the inputs. If invalid (e.g., malformed email), a `FormMessage` is displayed under the relevant field, and the submission is halted.
4.  **`onSubmit` Trigger**: If validation passes, the `onSubmit` function is executed.
5.  **Authentication Logic**: `onSubmit` calls the `login` function from `useAuth`.
6.  **`AuthProvider` Action**: The `login` function within `AuthProvider` takes over. It checks the provided credentials against the data stored in `localStorage`.
    -   **On Success**: It sets the user state in the context, updates `localStorage`, and the router (inside the provider) redirects the user to `/delivery`.
    -   **On Failure**: It triggers a destructive toast notification to inform the user of the error.
7.  The `LoginPage` component itself does not handle redirection or success/error states directly; it delegates this responsibility to the `useAuth` hook, which is a good separation of concerns.

## 4. How it Fits In

The `LoginPage` is a critical entry point for authenticated users. It's a clear example of a public, stateless form component whose sole job is to capture user input, validate it, and hand it off to a centralized service (the `AuthContext`) to handle the actual business logic. This pattern makes the component highly reusable and easy to test.
