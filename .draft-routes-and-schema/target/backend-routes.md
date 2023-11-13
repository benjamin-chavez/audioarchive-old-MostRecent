## Multi-seller Marketplace Backend API Routes

### Public API Routes:

```
GET /api/products
GET /api/products/:productId

GET /api/users/:username
```

### Authenticated API Routes:

#### User & Profile:
```
GET /api/me
PUT /api/me
GET /api/me/notifications

POST /api/users/:username/messages
GET /api/users/:username/messages
GET /api/users/:username/messages/:messageId
```

#### Listings:
```
POST /api/me/listings
GET /api/me/listings
PUT /api/me/listings/:listingId
DELETE /api/me/listings/:listingId
```

#### Purchases, Orders & Sales:
```
GET /api/me/purchases
GET /api/me/orders
GET /api/me/orders/:orderId
GET /api/me/sales
```

#### Cart & Wishlist:
```
GET /api/me/cart
PUT /api/me/cart
DELETE /api/me/cart/:productId

GET /api/me/wishlist
PUT /api/me/wishlist
DELETE /api/me/wishlist/:productId
```


#### Reviews:
- `POST /api/products/:productId/reviews`: Add a new review for a product.
- `PUT /api/reviews/:reviewId`: Update a specific review by the authenticated user.
- `DELETE /api/reviews/:reviewId`: Delete a specific review by the authenticated user.


### Admin/Moderator API Routes:

```
GET /api/admin/users
GET /api/admin/products
GET /api/admin/listings
PUT /api/admin/listings/:listingId
DELETE /api/admin/listings/:listingId
GET /api/admin/settings
GET /api/admin/reports
GET /api/admin/feedback
GET /api/admin/transactions
```
