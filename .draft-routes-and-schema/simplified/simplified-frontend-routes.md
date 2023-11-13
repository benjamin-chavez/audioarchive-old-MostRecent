## Multi-seller Marketplace Frontend Routing Structure

### Public Routes:

```
/
/about
/how-it-works
/terms
/privacy
/faq
/contact
/search

/products
/products/:productId

/users/:username

/login
/signup
```

### Authenticated Routes (Dashboard):

The "listings" routes can be merged with "products" for simplicity.

```
/dashboard
/dashboard/products
/dashboard/products/new
/dashboard/products/edit/:productId

/dashboard/purchases
/dashboard/orders
/dashboard/orders/:orderId
/dashboard/sales
/dashboard/wishlist
/dashboard/cart
/dashboard/settings

/dashboard/messages
/dashboard/messages/:messageId
/dashboard/notifications
```

### Admin/Moderator Routes:

```
/admin
/admin/users
/admin/products
/admin/settings
/admin/reports
/admin/feedback
/admin/transactions
```
