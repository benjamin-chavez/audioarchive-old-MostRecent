## API Routes

### User Routes:
- `GET /api/app-users` (Public)
- `GET /api/app-users/:username/profile` (Public)
- `PUT /api/app-users/:username/profile` (Private - User)
- `GET /api/app-users/:username/products` (Public)
- `GET /api/app-users/:username/orders` (Private - Buyer/Seller)

### Product Routes:
- `POST /api/products` (Private - User)
- `GET /api/products/:productId` (Public)
- `PUT /api/products/:productId` (Private - User)
- `DELETE /api/products/:productId` (Private - User)

### Marketplace Routes:
- `GET /api/marketplace/products` (Public)
- `GET /api/marketplace/search` (Public)

### Order Routes:
- `POST /api/orders` (Private - Buyer)
- `GET /api/orders/:orderId` (Private - Buyer/Seller)
- `PUT /api/orders/:orderId` (Private - Seller)
- `DELETE /api/orders/:orderId` (Private - Seller)
