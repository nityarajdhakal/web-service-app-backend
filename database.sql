
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    in_price NUMERIC(10, 2) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);


CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    lang VARCHAR(10) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);

