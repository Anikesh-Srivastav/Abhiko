
# File Documentation: `restaurant-card.tsx`

-   **Path**: `src/components/restaurant-card.tsx`
-   **Component**: `RestaurantCard`

## 1. Responsibility

This file defines the `RestaurantCard` component, a reusable UI element for displaying a summary of a single restaurant. It is used in a grid layout on the main `/delivery` page.

Its key responsibilities are:
1.  Displaying the restaurant's main image.
2.  Showing essential information: name, cuisine type (as a badge), and location.
3.  Providing a clear call-to-action ("View Menu") that links to the restaurant's detailed menu page.
4.  Applying hover effects to enhance interactivity.

## 2. Component Breakdown

### `RestaurantCard({ restaurant })`

#### Props
-   `restaurant`: An object of type `Restaurant` containing all the necessary data for one restaurant.

#### Rendering Logic
-   The component is built using the ShadCN `Card` as its base container. It has `overflow-hidden` to ensure the `next/image` respects the card's rounded corners.
-   **Hover Effect**: The root `Card` has `transition-all`, `hover:shadow-lg`, and `hover:-translate-y-1` classes to create a subtle lift-and-shadow effect when the user hovers over it, providing visual feedback.
-   **Image**:
    -   It uses the `next/image` component for optimized image loading.
    -   `layout="fill"` and `objectFit="cover"` are used to make the image fill its container (`relative h-48 w-full`) without distortion.
-   **Content**:
    -   The `CardContent` section displays the restaurant's data:
        -   A `Badge` for the `restaurant.cuisine`.
        -   The `CardTitle` for the `restaurant.name`.
        -   A `div` with an icon for the `restaurant.location`.
-   **Footer**:
    -   The `CardFooter` contains a single, full-width `Button`.
    -   **Navigation**: The `Button` uses the `asChild` prop to render a `Link` component from Next.js instead of a standard `<button>` element. This is a common and powerful pattern in ShadCN for creating buttons that act as hyperlinks. The link dynamically points to `/delivery/${restaurant.id}`.

## 3. Data Flow

1.  **Data Ingestion**: The `RestaurantCard` receives a `restaurant` object as a prop from its parent component (the `/delivery` page).
2.  **Display**: It directly renders the properties of the `restaurant` object (`name`, `image`, `location`, etc.) into the appropriate JSX elements.
3.  **User Interaction**: The user can hover over the card to see the visual effect or click the "View Menu" button.
4.  **Navigation**: Clicking the button navigates the user to the dynamic route for that specific restaurant's menu, passing the `restaurant.id` in the URL.

## 4. How it Fits In

Like the `PostCard`, the `RestaurantCard` is a classic "presentational" component. It is self-contained and its only job is to render the data it's given. The parent page (`DeliveryPage`) is responsible for fetching the list of all restaurants and then mapping over that list to render a `RestaurantCard` for each one.

This component is a fundamental building block for the restaurant browsing experience, making the UI modular and easy to manage. If the design of a restaurant summary needs to be changed, only this one file needs to be edited.
