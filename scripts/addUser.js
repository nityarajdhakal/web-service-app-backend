const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node scripts/addUser.js <name> <email> <password>');
  console.log('\nExample:');
  console.log('  node scripts/addUser.js "Nitya" "nitya@gmail.com" "mypassword123"');
  process.exit(1);
}

const [name, email, password] = args;


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function addUser() {
  try {
    
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      console.log(` Error: User with email ${email} already exists!`);
      process.exit(1);
    }

   
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    console.log('\n User added successfully!');
    console.log(`\nUser Details:`);
    console.log(`  ID: ${newUser.id}`);
    console.log(`  Name: ${newUser.name}`);
    console.log(`  Email: ${newUser.email}`);
    console.log(`  Password: ${password} (hashed in database)`);
    console.log('\nYou can now login with:');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    
  } catch (err) {
    console.error('Error adding user:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addUser();

