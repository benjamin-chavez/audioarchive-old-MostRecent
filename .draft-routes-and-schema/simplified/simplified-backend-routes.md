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

#### Products:
```
POST /api/me/products
GET /api/me/products
PUT /api/me/products/:productId
DELETE /api/me/products/:productId
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

### Admin/Moderator API Routes:

```
GET /api/admin/users
GET /api/admin/users/:userId
PUT /api/admin/users/:userId
DELETE /api/admin/users/:userId

GET /api/admin/products
PUT /api/admin/products/:productId
DELETE /api/admin/products/:productId

GET /api/admin/reports
GET /api/admin/feedback
GET /api/admin/transactions
```
