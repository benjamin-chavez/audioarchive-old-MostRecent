## Multi-seller Marketplace MVP - Frontend Routing Structure:

### General:

- `/`: Home page or landing page.
- `/login`: Login page (could be managed by Auth0).
- `/register`: User registration page (if applicable, given you might rely on Auth0).

### AppUsers:

- `/:username`: Public profile page for any user.

### Sellers:

- `/:username`: Public profile or storefront for a specific seller.

### Products:

- `/products`: Browse or search all products.
- `/products/:id`: Detailed view of a specific product.

### Dashboard (Protected Routes):

- `/dashboard`: Main dashboard view for the logged-in user.
- `/dashboard/profile/edit`: Edit the logged-in user's profile.
- `/dashboard/products/new`: Form for sellers to add a new product.
- `/dashboard/products/:id/edit`: Edit details of a specific product (for authorized sellers).
- `/dashboard/orders`: View a list of all orders made by the logged-in user.
- `/dashboard/orders/:id`: View details of a specific order.
- `/dashboard/cart`: View the logged-in user's shopping cart.

### Checkout
- `/checkout`: Process the checkout for the items in the cart.
