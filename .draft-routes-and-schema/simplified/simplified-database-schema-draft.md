## Multi-seller Marketplace Database Schema

### 1. `AppUsers`:
- `id`: Primary Key, Serial
- `username`: Text, Unique
- `email`: Text, Unique
- `password`: Text (hashed)
- `firstName`: Text
- `lastName`: Text
- `profileImage`: Text (URL or file path)
- `isAdmin`: Boolean (to check if the user has admin privileges)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 2. `Products`:
- `id`: Primary Key, Serial
- `appUserId`: Foreign Key to `AppUsers` (the creator/seller of the product)
- `name`: Text
- `genre`: Enum (specific types like 'dubstep', 'house', 'pop', 'trap')
- `software`: Enum (specific software types)
- `bpm`: Integer (between 20 and 999)
- `price`: Decimal
- `artwork`: Text (URL or file path to the product artwork, with a default value)
- `key`: Text (optional unique key or identifier)
- `label`: Text (optional display label)
- `description`: Text (longer description)
- `stockQuantity`: Integer (quantity of the product available for sale)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- Composite Unique Constraint on (`appUserId`, `name`)

### 3. `Orders`:
- `id`: Primary Key, Serial
- `buyerId`: Foreign Key to `AppUsers`
- `productId`: Foreign Key to `Products`
- `quantity`: Integer
- `totalPrice`: Decimal
- `status`: Enum (e.g., 'pending', 'shipped', 'delivered', 'canceled')
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 4. `Messages`:
- `id`: Primary Key, Serial
- `senderId`: Foreign Key to `AppUsers`
- `receiverId`: Foreign Key to `AppUsers`
- `content`: Text
- `isRead`: Boolean
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### 5. `Wishlist`:
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers`
- `productId`: Foreign Key to `Products`
- `createdAt`: Timestamp

### 6. `Cart`:
- `id`: Primary Key, Serial
- `userId`: Foreign Key to `AppUsers`
- `productId`: Foreign Key to `Products`
- `quantity`: Integer
- `createdAt`: Timestamp
