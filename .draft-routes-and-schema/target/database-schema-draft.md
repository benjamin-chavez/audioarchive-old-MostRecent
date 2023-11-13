## Multi-seller Marketplace Database Schema

### 1. `AppUsers`:
- `id`: Primary Key, Serial
- `username`: Text, Unique
- `email`: Text, Unique
- `password`: Text (hashed, never store plain-text passwords)
- `firstName`: Text
- `lastName`: Text
- `profileImage`: Text (URL or file path)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Products:
- `id`: Primary Key, Serial
- `appUserId`: Foreign Key to `AppUsers` (the creator of the product)
- `name`: Text
- `genre`: Enum (specific types like 'dubstep', 'house', 'pop', 'trap')
- `software`: Enum (specific software types)
- `bpm`: Integer (between 20 and 999)
- `price`: Decimal
- `artwork`: Text (URL or file path to the product artwork, with a default value)
- `key`: Text (optional unique key or identifier)
- `label`: Text (optional display label)
- `description`: Text (longer description)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- Composite Unique Constraint on (`appUserId`, `name`)

### Listings:
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers` (the seller's ID)
- `productId`: Foreign Key to `Products`
- `listingPrice`: Decimal (This can be different from the original product price if the seller wants to list at a different price)
- `stockQuantity`: Integer
- `customDescription`: Text (optional, seller-specific details about the product)
- `customImages`: Text Array (list of URLs or file paths, optional, seller-specific images)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 4. `Reviews`:
- `id`: Primary Key, Serial
- `productId`: Foreign Key to `Products`
- `userId`: Foreign Key to `AppUsers` (reviewer's ID)
- `rating`: Integer (e.g., a value between 1 and 5)
- `comment`: Text
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 5. `Orders`:
- `id`: Primary Key, Serial
- `buyerId`: Foreign Key to `AppUsers`
- `listingId`: Foreign Key to `Listings`
- `quantity`: Integer
- `totalPrice`: Decimal
- `status`: Text (e.g., "pending", "shipped", "delivered")
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 6. `Messages`:
- `id`: Primary Key, Serial
- `senderId`: Foreign Key to `AppUsers`
- `receiverId`: Foreign Key to `AppUsers`
- `content`: Text
- `createdAt`: Timestamp

### 7. `Notifications`:
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers`
- `content`: Text
- `isRead`: Boolean
- `createdAt`: Timestamp

### 8. `Wishlist`:
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers`
- `productId`: Foreign Key to `Products`
- `createdAt`: Timestamp

### 9. `Cart`:
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers`
- `listingId`: Foreign Key to `Listings`
- `quantity`: Integer
- `createdAt`: Timestamp

### 10. `Admin` (Optional):
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers`
- `role`: Text (e.g., "admin", "moderator")
- `createdAt`: Timestamp
