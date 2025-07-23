
# Project Overview: Abiko Dine-In & Delivery

## 1. Project Description

**Abiko** is a modern, feature-rich web application designed to serve as a versatile food ordering platform. It seamlessly combines dine-in and delivery services with a social component, creating a complete ecosystem for food enthusiasts. The application is built as a Single Page Application (SPA) with a focus on a clean, intuitive user experience and a robust, scalable architecture.

The core functionalities include:
- **User Authentication**: Secure sign-up and login flows.
- **Restaurant Browsing**: A filterable list of restaurants for delivery and a QR-code-based system for dine-in.
- **Menu Interaction**: Users can browse detailed menus for each restaurant.
- **Cart Management**: A persistent shopping cart where users can add, update, and remove items.
- **Checkout & Payment**: A multi-step checkout process with special instructions, rewards integration, and a simulated payment confirmation.
- **Rewards System**: Users earn points on purchases and can redeem them for discounts.
- **Abigram Social Feed**: A dedicated social feed where users can share their dining experiences by creating posts with images and descriptions.

## 2. Technology Stack

The project is built on a modern, production-ready technology stack:

- **Framework**: **Next.js** (with App Router) for server-side rendering, static site generation, and optimized performance.
- **Language**: **TypeScript** for type safety and improved developer experience.
- **UI Library**: **React** for building interactive and reusable components.
- **Styling**: **Tailwind CSS** for utility-first styling, combined with **ShadCN UI** for a pre-built, accessible, and customizable component library.
- **State Management**:
    - **React Context API**: Used for global state management (Authentication, Cart).
    - **`@tanstack/react-query`**: For managing server state, caching, and data fetching.
    - **`localStorage`**: Serves as a **mock backend/database** for persisting user sessions, cart contents, user profiles, and posts. This choice enables rapid development and a fully functional frontend experience without a live database, and is designed to be easily swappable with a real backend service.
- **AI/Generative Features**: **Genkit** (via `@genkit-ai/googleai`) for integrating generative AI capabilities.
- **Forms**: **React Hook Form** with **Zod** for robust, type-safe form validation.

## 3. Core Application Flows

### Why `localStorage`?
`localStorage` is strategically used as a substitute for a traditional backend database (like Firebase Firestore or a REST API). This approach offers several key advantages for this stage of development:
- **Persistence Without a Backend**: It allows user sessions, cart contents, and other critical data to persist across page reloads and browser sessions, mimicking real-world application behavior.
- **Rapid Prototyping**: It enables the development and testing of complex data flows (like checkout and rewards) entirely on the client-side, speeding up iteration.
- **Designed for Scalability**: The application's data layers (`useAuth`, `useCart`) are structured as hooks and providers that abstract away the data source. This means the underlying `localStorage` calls can be swapped out for API calls to a real backend with minimal changes to the UI components themselves.

### Key Flows:

#### a. Authentication Flow
1.  **Signup/Login**: Users provide credentials via forms.
2.  **`useAuth` Hook**: The `AuthContext` handles the logic. User data and credentials are created or verified.
3.  **`localStorage`**: On success, user profile and session data are stored in `localStorage`. The user is redirected to the main app.
4.  **`AuthGuard` / `AppLayout`**: These components protect routes by checking for a valid session in `localStorage`.

#### b. Cart & Checkout Flow
1.  **Add to Cart**: From a restaurant's menu page (`/delivery/[id]`), users add items.
2.  **`useCart` Hook**: The `CartContext` updates the cart state.
3.  **`localStorage`**: The updated cart (items, quantities, restaurantId) is saved to `localStorage`, ensuring it persists.
4.  **Checkout (`/checkout`)**: The user reviews the order, adds instructions, and can apply reward points.
5.  **Payment (`/payment`)**:
    - Final order details are temporarily stored in `localStorage` to pass them from checkout to payment.
    - Upon confirming payment, the `useAuth` hook updates user points, `useCart` clears the cart, and both update `localStorage` accordingly.
    - The user is redirected to a confirmation or home page.

#### c. Abigram Social Feed
1.  **View Feed (`/abigram`)**: The page fetches all posts from `localStorage`. It also enriches each post with author details by looking up user profiles (also from `localStorage`).
2.  **Create Post (`/abigram/new` or Dialog)**:
    - A form allows the user to enter a title, description, and upload an image.
    - The image is converted to a Base64 data URI.
    - On submission, a new post object is created and added to the array of posts in `localStorage`.
    - The feed is refreshed to show the new post.
