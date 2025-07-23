
# Application Architecture & Backend Integration Strategy

This document outlines the architecture of the Abhiko frontend application and provides a clear strategy for integrating it with a scalable backend built on Node.js, Express, and MongoDB.

## 1. Backend Integration Strategy

The current frontend application is architected to be **backend-agnostic**. The core business logic for features like authentication, cart management, and order processing is encapsulated within React Context Providers and custom hooks (`useAuth`, `useCart`). Currently, these hooks interact with `localStorage`. To connect to a real backend, only these provider/hook files need to be modified; the UI components that consume them will require minimal to no changes.

The transition will involve replacing `localStorage` calls with `fetch` or `axios` requests to a new Node.js/Express API.

### API Endpoint Mapping

The existing `localStorage` logic will be mapped to the following RESTful API endpoints:

-   **Authentication (`/api/auth`)**:
    -   `POST /api/auth/signup`: Replaces the `signup` function. Creates a new user in the MongoDB `users` collection.
    -   `POST /api/auth/login`: Replaces the `login` function. Authenticates a user against the database and returns a JWT (JSON Web Token) for session management.
    -   `PUT /api/users/profile`: Replaces the `updateUser` function to update a user's profile.
    -   `POST /api/users/points`: Replaces `addPoints` and `spendPoints` to manage user rewards.

-   **Cart (`/api/cart`)**:
    -   `GET /api/cart`: Retrieves the current user's cart from MongoDB.
    -   `POST /api/cart/items`: Replaces `addToCart`. Adds a new item or increments its quantity.
    -   `DELETE /api/cart/items/:itemId`: Replaces `removeFromCart`.
    -   `DELETE /api/cart`: Replaces `clearCart`.

-   **Orders (`/api/orders`)**:
    -   `POST /api/orders`: Submits a new order, clears the user's cart, and updates reward points.
    -   `GET /api/orders`: Retrieves a user's order history.

## 2. Why `localStorage` is Used Currently

The use of `localStorage` in this project is a deliberate architectural choice for the initial development phase.

-   **Temporary Backend Stand-in**: It acts as a mock database, allowing the entire frontend to be built and tested without a live backend dependency.
-   **Simulates Real-World Persistence**: It mimics how a real application would behave by persisting the user's session, cart contents, and other data across page reloads and browser tabs.
-   **Enables Rapid Prototyping**: The current setup allows for fast iteration on UI/UX and complex user flows (like checkout and rewards) without waiting for backend development.
-   **Designed for a Seamless Transition**: The logic is modular. The `useAuth` and `useCart` hooks abstract the data source. Swapping `localStorage.getItem` with `fetch('/api/cart')` is a straightforward change that won't break the UI components.

## 3. Proposed Backend Tech Stack

-   **Node.js**: A lightweight and efficient JavaScript runtime, perfect for building fast, non-blocking, I/O-heavy applications like a food delivery platform.
-   **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It will be used for routing, middleware, and handling HTTP requests/responses.
-   **MongoDB**: A NoSQL, document-based database. Its flexible schema is ideal for storing varied data structures like user profiles, nested order documents, and restaurant menus.

## 4. Scalability Plan

The chosen architecture is designed for scalability from the ground up.

-   **Database Layer (MongoDB)**:
    -   **Replication**: Use replica sets to ensure high availability and data redundancy.
    -   **Sharding**: For horizontal scalability, the database can be sharded based on keys (e.g., `restaurantId` or `userId`) to distribute the load across multiple servers as the application grows.
    -   **Indexing**: Implement proper indexing on collections (e.g., on user emails, order timestamps) to optimize query performance and reduce read/write bottlenecks.

-   **Backend Layer (Node.js/Express)**:
    -   **Stateless Services**: The Express API will be stateless, meaning each request is independent. This allows for easy horizontal scaling.
    -   **Containerization**: The backend can be containerized using **Docker**, making it easy to deploy, manage, and scale using orchestration tools like Kubernetes.
    -   **Load Balancing**: A load balancer (like Nginx or a cloud provider's service) will be used to distribute incoming traffic across multiple instances of the Node.js application, leveraging Node's single-threaded nature with clustering or multiple processes.

-   **Frontend Layer (Next.js/React)**:
    -   **CDN Hosting**: The frontend is already optimized for deployment on platforms like Vercel or Firebase Hosting, which provide global CDN distribution for fast asset delivery.
    -   **Efficient Caching**: TanStack Query is already integrated, providing sophisticated client-side caching, revalidation, and background refetching to reduce the load on the backend API.

-   **Real-time Updates (Future Enhancement)**:
    -   For features like live order tracking or admin dashboards, **WebSockets** (via libraries like `Socket.IO`) can be integrated into the Node.js server to push real-time updates to the client without the need for constant polling.

