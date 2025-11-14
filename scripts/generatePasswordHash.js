const bcrypt = require('bcryptjs');


const password = process.argv[2] || 'password123';

console.log('Generating password hash...\n');

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nSQL to insert user:');
  console.log('INSERT INTO users (name, email, password) VALUES');
  console.log(`('Your Name', 'your@email.com', '${hash}');`);
  console.log('\nOr use the addUser.js script:');
  console.log(`node scripts/addUser.js "Your Name" "your@email.com" "${password}"`);
});

