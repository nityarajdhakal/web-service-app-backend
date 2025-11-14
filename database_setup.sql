-- Create Users Table and a sample user
-- The password for this user is 'password123'
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password) VALUES
('Test User', 'test@example.com', '$2a$10$.FPAnbssPMM/vaZ4XebXz.mfBtfQg9UBB1toxpotleFz3EfwAkskO');

-- Create Products Table and populate with 20+ items
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    in_price NUMERIC(10, 2) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (product_name, in_price, price) VALUES
('Web Design Package', 1200.00, 2500.00),
('SEO Optimization Service', 450.00, 900.00),
('Social Media Management', 300.00, 650.00),
('Content Creation (Monthly)', 500.00, 1100.00),
('E-commerce Setup', 1500.00, 3200.00),
('Logo Design', 250.00, 550.00),
('Brand Identity Kit', 600.00, 1300.00),
('Mobile App Development', 4000.00, 8500.00),
('IT Consultation (Hourly)', 75.00, 150.00),
('Cloud Hosting (Yearly)', 200.00, 400.00),
('Database Maintenance', 150.00, 320.00),
('API Integration', 700.00, 1500.00),
('UX/UI Audit', 400.00, 850.00),
('Performance Testing', 350.00, 750.00),
('Cybersecurity Package', 800.00, 1700.00),
('Copywriting Service', 220.00, 480.00),
('Video Production', 1100.00, 2400.00),
('Email Marketing Campaign', 180.00, 400.00),
('PPC Campaign Management', 250.00, 550.00),
('Customer Support Software', 100.00, 220.00),
('Project Management Tool', 80.00, 180.00);

-- Create Translations Table and populate with all UI texts
CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    lang VARCHAR(10) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    UNIQUE(page, lang, key)
);

-- Login Page Translations
INSERT INTO translations (page, lang, key, value) VALUES
('login', 'en', 'loginTitle', 'Login'),
('login', 'sv', 'loginTitle', 'Logga in'),
('login', 'en', 'emailPlaceholder', 'Email'),
('login', 'sv', 'emailPlaceholder', 'E-post'),
('login', 'en', 'passwordPlaceholder', 'Password'),
('login', 'sv', 'passwordPlaceholder', 'Lösenord'),
('login', 'en', 'loginButton', 'Login'),
('login', 'sv', 'loginButton', 'Logga in'),
('login', 'en', 'menuHome', 'Home'),
('login', 'sv', 'menuHome', 'Hem'),
('login', 'en', 'menuContact', 'Contact'),
('login', 'sv', 'menuContact', 'Kontakt');

-- Terms Page Translations
INSERT INTO translations (page, lang, key, value) VALUES
('terms', 'en', 'title', 'Terms and Conditions'),
('terms', 'sv', 'title', 'Villkor och bestämmelser'),
('terms', 'en', 'lastUpdated', 'Last updated: 2025-11-09'),
('terms', 'sv', 'lastUpdated', 'Senast uppdaterad: 2025-11-09'),
('terms', 'en', 'content', 'Welcome to our application. By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service. This is a dummy text for the terms page.'),
('terms', 'sv', 'content', 'Välkommen till vår applikation. Genom att komma åt eller använda vår tjänst godkänner du att vara bunden av dessa villkor. Om du inte håller med om någon del av villkoren får du inte använda tjänsten. Detta är en dummytext för villkorssidan.');

-- Pricelist Page Translations
INSERT INTO translations (page, lang, key, value) VALUES
('pricelist', 'en', 'title', 'Pricelist'),
('pricelist', 'sv', 'title', 'Prislista'),
('pricelist', 'en', 'productHeader', 'Product / Service'),
('pricelist', 'sv', 'productHeader', 'Produkt / Tjänst'),
('pricelist', 'en', 'inPriceHeader', 'In Price'),
('pricelist', 'sv', 'inPriceHeader', 'Inpris'),
('pricelist', 'en', 'priceHeader', 'Price'),
('pricelist', 'sv', 'priceHeader', 'Pris'),
('pricelist', 'en', 'menuHome', 'Home'),
('pricelist', 'sv', 'menuHome', 'Hem'),
('pricelist', 'en', 'menuContact', 'Contact'),
('pricelist', 'sv', 'menuContact', 'Kontakt');

