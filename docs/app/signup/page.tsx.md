
# File Documentation: `signup/page.tsx`

-   **Path**: `src/app/signup/page.tsx`
-   **Component**: `SignupPage`

## 1. Responsibility

This file defines the user registration (sign-up) page. It is a public route where new users can create an account to use the application.

Its key responsibilities are:
1.  Providing a comprehensive form for users to enter their personal details (full name, email, phone, address), password, and choose an avatar.
2.  Ensuring all fields are correctly filled out using client-side validation with `react-hook-form` and `Zod`.
3.  Calling the `signup` function from the `useAuth` hook to handle the account creation logic.
4.  Providing a link for existing users to navigate to the login page.

## 2. Component Breakdown

### `SignupPage()`

This is the main component for the page.

#### Form Management
-   **`useForm`**: This hook from `react-hook-form` initializes and manages the registration form.
    -   **`resolver: zodResolver(formSchema)`**: Integrates a `Zod` schema (`formSchema`) for validation. This schema defines constraints for all fields, such as minimum length for name and password, a valid email format, and requiring an avatar selection.
    -   **`defaultValues`**: Sets the initial values for the form fields.

#### Data Hooks
-   **`useAuth()`**: Provides access to the `signup` function from the `AuthContext`.

#### Core Logic

-   **Form Submission**:
    -   **`onSubmit(values)`**: This function is called by `react-hook-form` only when all inputs successfully pass the `Zod` validation.
    -   It takes the validated `values` object and passes it to the `signup(values)` function from the `useAuth` hook.
    -   The `signup` function itself handles the logic of checking for existing users, creating the new user profile, storing the data, and redirecting.

#### Rendering
-   Similar to the login page, the layout is a single, centered `Card` for a focused registration process.
-   The `<Form>` component from ShadCN wraps all form elements.
-   **`FormField`**: Each input is wrapped in a `FormField` component to connect it to the `useForm` state. This includes standard `Input` components and a `RadioGroup` for avatar selection.
-   **Avatar Selection**: The `RadioGroup` for avatars is a good example of a custom form control. It maps over the `AVATARS` array from `src/lib/data.ts` to render selectable image options. The selected avatar's URL is stored as a string in the form state.
-   A link to `/login` is provided for users who already have an account.

## 3. Data Flow

1.  **User Input**: The user fills in their details and selects an avatar. `react-hook-form` manages the state of all inputs.
2.  **Submission**: The user clicks the "Sign Up" button.
3.  **Client-Side Validation**: `react-hook-form` and `Zod` validate all fields against `formSchema`. If any validation fails, an error message is shown under the corresponding field, and submission is prevented.
4.  **`onSubmit` Trigger**: If validation passes, the `onSubmit` function is called.
5.  **Authentication Logic**: `onSubmit` passes the complete user data object to the `signup` function from `useAuth`.
6.  **`AuthProvider` Action**: The `signup` function in `AuthProvider` takes over:
    -   It checks if a user with that email already exists in `localStorage`. If so, it shows an error toast.
    -   If not, it creates a new `User` object, assigns a unique ID, and saves the new user profile and credentials to `localStorage`.
    -   It sets the new user as the currently authenticated user in the `AuthContext`.
    -   It redirects the user to `/delivery` and shows a welcome toast.
7.  Similar to the login page, this component delegates all business logic to the `useAuth` hook, keeping the component focused on presentation and input collection.

## 4. How it Fits In

The `SignupPage` is the gateway for new users into the Abhiko ecosystem. It demonstrates a robust, user-friendly, and secure approach to form handling. The use of Zod for schema-based validation ensures data integrity before it's even sent to the business logic layer, and the immediate feedback on validation errors provides a smooth user experience.
