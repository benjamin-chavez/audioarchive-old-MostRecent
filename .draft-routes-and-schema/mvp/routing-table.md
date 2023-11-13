

**Frontend Route**                 **Backend API Route**                       **Request Type(s)**
****
`/`                               N/A (Static content)                  N/A
`/login`                          N/A (Handled by Auth0)                N/A
`/register`                       `POST /api/users`                     POST

****
`/:username`                      `GET /api/users/:username`            GET, PUT, DELETE
`/:username` (for sellers)        `GET /api/sellers/:username`          GET, PUT, DELETE

****
`/products`                       `GET /api/products`                   GET, POST
`/products/:id`                   `GET /api/products/:id`               GET, PUT, DELETE

****
`/dashboard`                      N/A                                   N/A
`/dashboard/profile/edit`         `PUT /api/users/:username`            PUT

`/dashboard/products/new`         `POST /api/products`                  POST
`/dashboard/products/:id/edit`    `PUT /api/products/:id`               PUT

`/dashboard/orders`               `GET /api/orders`                     GET, POST
`/dashboard/orders/:id`           `GET /api/orders/:id`                 GET, PUT, DELETE

`/dashboard/cart`                 `GET /api/cart`                       GET, POST, PUT, DELETE

****
`/checkout`                       N/A (Handles the process)             N/A
