## Multi-seller Marketplace MVP - Database Schema:

#### AppUsers:
- `id`: INTEGER (Primary Key)
- `auth0_user_id`: STRING
- `email`: STRING
- `full_name`: STRING
- `profile_picture`: STRING
- `bio`: TEXT
- `website_link`: STRING
- `social_links`: JSON or TEXT
- `user_role`: STRING
- `created_at`: TIMESTAMP

#### Sellers:
- `id`: INTEGER (Primary Key)
- `user_id`: INTEGER (Foreign Key to AppUsers)
- `store_name`: STRING
- `description`: TEXT
- `created_at`: TIMESTAMP

#### Products:
- `id`: INTEGER (Primary Key)
- `name`: STRING
- `description`: TEXT
- `price`: DECIMAL
- `download_link`: STRING
- `genre_id`: INTEGER (Foreign Key to Genres)
- `daw_id`: INTEGER (Foreign Key to DAWs)
- `seller_id`: INTEGER (Foreign Key to Sellers)

#### Genres:
- `id`: INTEGER (Primary Key)
- `name`: STRING
- `description`: TEXT

#### DAWs:
- `id`: INTEGER (Primary Key)
- `name`: STRING
- `description`: TEXT

#### Orders:
- `id`: INTEGER (Primary Key)
- `user_id`: INTEGER (Foreign Key to AppUsers)
- `total_amount`: DECIMAL
- `status`: STRING
- `created_at`: TIMESTAMP

#### OrderDetails:
- `id`: INTEGER (Primary Key)
- `order_id`: INTEGER (Foreign Key to Orders)
- `product_id`: INTEGER (Foreign Key to Products)
- `quantity`: INTEGER
- `price`: DECIMAL
- `seller_id`: INTEGER (Foreign Key to Sellers)

#### Cart:
- `id`: INTEGER (Primary Key)
- `user_id`: INTEGER (Foreign Key to AppUsers)

#### CartDetails:
- `id`: INTEGER (Primary Key)
- `cart_id`: INTEGER (Foreign Key to Cart)
- `product_id`: INTEGER (Foreign Key to Products)
- `quantity`: INTEGER
- `seller_id`: INTEGER (Foreign Key to Sellers)
