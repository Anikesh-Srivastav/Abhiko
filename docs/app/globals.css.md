
# File Documentation: `globals.css`

-   **Path**: `src/app/globals.css`

## 1. Responsibility

This file is the global stylesheet for the entire application. It sets the foundation for the app's visual identity and is the central point for defining the design system using CSS variables.

Its key responsibilities are:
1.  **Importing Tailwind CSS**: It includes the core `@tailwind` directives (`base`, `components`, `utilities`) which are necessary for Tailwind CSS to work.
2.  **Defining the ShadCN Theme**: It defines all the CSS custom properties (variables) that power the ShadCN UI component library's theme. This includes colors for both light and dark modes.
3.  **Setting Base Styles**: It can define base styles for the entire application, such as the default background and text colors applied to the `<body>` tag.

## 2. File Structure

The file is structured using CSS `@layer` at-rules, which help control the order in which styles are generated, preventing specificity issues.

### `@layer base`

This layer is used for base styles and global definitions.

#### `:root` and `.dark` Selectors
-   **`:root`**: Defines the CSS variables for the **light theme**. These variables control every aspect of the color scheme, from background and text colors to primary, secondary, accent, and destructive (error) colors.
-   **`.dark`**: Defines the same set of CSS variables but with values tailored for the **dark theme**. When the `ThemeProvider` adds the `dark` class to the `<html>` element, these variables override the `:root` ones.

#### CSS Variables (`--variable-name`)
The theme is built using HSL (Hue, Saturation, Lightness) color values, which makes it easy to create a consistent and harmonious color palette. Key variables include:
-   `--background`: The main page background color.
-   `--foreground`: The main text color.
-   `--card`: The background color for card components.
-   `--primary`: The main brand color, used for buttons, links, and highlights.
-   `--secondary`: A secondary color for less prominent elements.
-   `--accent`: An accent color for hover states and other highlights.
-   `--destructive`: The color used for error states and destructive actions.
-   `--border`: The color for borders on components like inputs and cards.
-   `--input`: The background color for input fields.
-   `--ring`: The color for focus rings on interactive elements.
-   `--radius`: The base value for border-radius, giving components rounded corners.

#### Global Element Styles
-   `*`: A universal selector that applies the `border-border` class to all elements, setting a default border color from the theme.
-   `body`: Sets the default background and text colors for the entire application using `bg-background` and `text-foreground`, which map to the CSS variables.

## 3. How it Works

1.  **Next.js Integration**: This CSS file is imported into the root layout (`src/app/layout.tsx`), so its styles are applied globally.
2.  **Tailwind Processing**: During the build process, Tailwind CSS processes this file. It injects its base styles, component classes, and utility classes where the `@tailwind` directives are located.
3.  **ShadCN Integration**: ShadCN components are built with Tailwind classes that reference the CSS variables defined here (e.g., a button might use `bg-primary`). This allows the entire component library's look and feel to be controlled from this single file.
4.  **Theme Switching**: The `ThemeProvider` (using `next-themes`) toggles the `.dark` class on the `<html>` element. When the class is present, the `.dark` block of CSS variables in this file becomes active, instantly changing the theme of all components.

## 4. How it Fits In

`globals.css` is the cornerstone of the application's design system. It provides a centralized, maintainable, and scalable way to manage the visual appearance of the entire app. By leveraging CSS variables, it makes themeing and style adjustments incredibly efficient, as changing a single variable here can update dozens of components simultaneously.
