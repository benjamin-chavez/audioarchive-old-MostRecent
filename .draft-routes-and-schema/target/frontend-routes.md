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
/products/:productId/reviews

/users
/users/:username

/login
/signup
```

### Authenticated Routes (Dashboard):

For sellers, it's more about managing their listings than the products themselves.

```
/dashboard
/dashboard/listings
/dashboard/listings/new
/dashboard/listings/edit/:listingId

/dashboard/purchases
/dashboard/orders
/dashboard/orders/:orderId
/dashboard/sales
/dashboard/wishlist
/dashboard/cart
/dashboard/settings
/dashboard/my-reviews
/dashboard/my-reviews/edit/:reviewId

/dashboard/messages
/dashboard/messages/:messageId
/dashboard/notifications
```

### Admin/Moderator Routes:

```
/admin
/admin/users
/admin/products
/admin/listings
/admin/settings
/admin/reports
/admin/feedback
/admin/transactions
/admin/reviews
```
