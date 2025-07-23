
# File Documentation: `profile/page.tsx`

-   **Path**: `src/app/(app)/profile/page.tsx`
-   **Component**: `ProfilePage`

## 1. Responsibility

This file defines the user profile page. It serves as a central dashboard for users to view and manage their personal information and track their reward points. Its key responsibilities are:
1.  Displaying the current user's details (name, email, phone, address, avatar).
2.  Providing an interface to edit this information through a dialog form.
3.  Displaying the user's current reward points balance.
4.  Validating user input for the profile update form.

## 2. Component Breakdown

### `ProfilePage()`

This is the main component for the page.

#### State Management
-   **`isDialogOpen`**: A boolean state (`useState`) to control the visibility of the "Edit Profile" dialog.

#### Data Hooks
-   **`useAuth()`**: Provides access to the current `user` object and the `updateUser` function from the `AuthContext`.
-   **`useToast()`**: Used to display success or error notifications after a profile update attempt.

#### Form Management
-   **`useForm`**: This hook from `react-hook-form` initializes and manages the profile editing form.
    -   **`resolver: zodResolver(profileFormSchema)`**: Integrates `Zod` for schema-based validation. The `profileFormSchema` defines the expected shape and constraints of the form data (e.g., name must be at least 2 characters).
    -   **`defaultValues`**: Pre-populates the form with the current `user`'s data, ensuring a seamless editing experience.

#### Core Logic

-   **Data Display**: The component directly accesses properties from the `user` object (`user.fullName`, `user.email`, etc.) to display the profile details.
-   **Form Submission**:
    -   **`onSubmit(values)`**: This function is called by `react-hook-form` when the form is submitted successfully (i.e., passes Zod validation).
    -   It calls the `updateUser` function from `useAuth`, passing the validated form `values`.
    -   Based on the return value of `updateUser`, it displays a success or error toast.
    -   It closes the dialog by setting `isDialogOpen` to `false`.
-   **Fallback**: If for some reason the page is rendered without a logged-in `user`, it displays a loading spinner (though the `AppLayout` would typically prevent this scenario).

#### Rendering

-   The page is structured as a two-column grid on larger screens.
-   **Left Column**: A `Card` displays the user's profile information, including their avatar. It contains a `DialogTrigger` (the "Edit" button) to open the profile editing form.
-   **Right Column**: A `Card` displays the user's reward points. This card has a `sticky` position so it stays in view while scrolling.
-   **Edit Profile Dialog**:
    -   The dialog contains a `<Form>` component from ShadCN, which is a wrapper around `react-hook-form`'s `FormProvider`.
    -   `FormField` components are used to connect each input (`Input`, `RadioGroup`) to the form state, handle its value, and display validation messages.

## 3. Data Flow

1.  **Data Ingestion**: The page loads and reads the `user` object from the `AuthContext` via the `useAuth` hook.
2.  **Display**: The user's data is rendered in the profile and rewards cards.
3.  **User Interaction (Edit)**: The user clicks the "Edit" button, opening the dialog. The form is pre-filled with the user's current data.
4.  **Form Input**: The user modifies the form fields. `react-hook-form` manages the state of these inputs.
5.  **Submission & Validation**: The user clicks "Save changes." `react-hook-form` validates the input against the `profileFormSchema`. If validation fails, error messages are automatically displayed.
6.  **`onSubmit` Trigger**: If validation passes, the `onSubmit` function is called with the new data.
7.  **Context Update**: `onSubmit` calls `updateUser(newData)`. The `AuthProvider` updates its state and syncs the new user object to `localStorage`.
8.  **Re-render**: Because the `user` object from `useAuth` has changed, the `ProfilePage` re-renders, displaying the newly updated information. The dialog is closed.

## 4. How it Fits In

The profile page is a standard but essential part of any user-centric application. It demonstrates:
-   How to display and update user-specific data.
-   Best practices for form handling using `react-hook-form` and `Zod` for validation.
-   The use of a dialog (`Dialog`) for in-context editing without navigating to a separate page.
-   A clean separation of UI (the page) and business logic (the `useAuth` hook).
