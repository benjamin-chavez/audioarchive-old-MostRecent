### Backend API Routes:

#### Public API Routes:
- `GET /api/products`
- `GET /api/products/:productId`
- `GET /api/users/:username`

#### Authenticated API Routes:

##### Listings:
- `POST /api/me/listings`
- `GET /api/me/listings`
- `DELETE /api/me/listings/:listingId`

##### Orders:
- `GET /api/me/orders`

##### Cart:
- `GET /api/me/cart`
- `PUT /api/me/cart`
- `DELETE /api/me/cart/:productId`

#### Admin/Moderator API Routes:
- `GET /api/admin/users`
- `GET /api/admin/listings`
- `DELETE /api/admin/listings/:listingId`




```ts
// Public Routes for specific users or all users
router.get('/app-users/', appUserController.getAllAppUsers);
// router.post('/app-users/', appUserController.createAppUser);
router.get('/app-users/:username', appUserController.getAppUserByUsername);
router.get('/app-users/:username/products', appUserController.getAppUserWithProducts2);



//
router.get('/me', checkJwt, meController.getMe);
router.put('/me', checkJwt, meController.updateMe);
router.delete('/me', checkJwt, meController.deleteMe);

router.get('/me/products', checkJwt, meController.getAllProducts);
router.get('/me/products/:productId', checkJwt, meController.getProductById);
router.put('/me/products/:productId', checkJwt, meController.updateProduct);
router.delete('/me/products/:productId', checkJwt, meController.deleteProduct);



//
router.get('/products/', productController.getAllProductsWithUserDetails);
router.get('/products/:id', productController.getProductById);
```
