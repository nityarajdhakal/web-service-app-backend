# Mini App Backend

A Node.js backend application built with Express and PostgreSQL, featuring JWT authentication, protected routes, and API endpoints for products and translations.

## Features

- JWT-based authentication
- Protected API routes
- PostgreSQL database integration
- Product management
- Multi-language translation support

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your database:
   - Create a PostgreSQL database
   - Run the SQL commands from `database.sql` to create the required tables

3. Configure environment variables:
   - Copy `.env` and update with your database credentials and JWT secret

4. Start the server:
```bash
npm start
```

The server will run on port 5000 (or the port specified in your `.env` file).

## Adding Users to Database

### Option 1: Using the Add User Script (Recommended)
The easiest way to add a new user is using the provided script:

```bash
node scripts/addUser.js "John Doe" "john@example.com" "mypassword123"
```

This script will:
- Hash the password automatically
- Check if the email already exists
- Add the user to the database
- Show you the login credentials

### Option 2: Generate Password Hash Manually
If you want to add users directly via SQL:

```bash
node scripts/generatePasswordHash.js "yourpassword"
```

This will output a hash that you can use in SQL:
```sql
INSERT INTO users (name, email, password) VALUES
('Your Name', 'your@email.com', '<generated_hash>');
```

### Default Test User
After running `database_setup.sql`, you'll have a test user:
- **Email:** `test@example.com`
- **Password:** `password123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate a user and receive a JWT token
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "success": true, "accessToken": "...", "data": { "name": "User Name" } }`

### Products (Protected)
- `GET /api/products` - Fetch all products
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "success": true, "data": [...] }`

### Translations
- `GET /api/translations?page=<page>&lang=<lang>` - Fetch translations for a specific page and language
  - Query params: `page` (required), `lang` (required)
  - Response: `{ "success": true, "data": { "key": "value", ... } }`

## Project Structure

```
/project-backend
|-- /src
|   |-- /config          # Database configuration
|   |-- /controllers     # Request and response logic
|   |-- /middleware      # Authentication middleware
|   |-- /routes          # API routes
|   `-- app.js           # Express app setup
|-- .env                 # Environment variables
|-- database.sql         # Database schema
|-- package.json
`-- server.js            # Server initialization
```

