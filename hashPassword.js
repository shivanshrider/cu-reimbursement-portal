const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  console.log('Hashed Password:', hashedPassword);
};

// Replace 'admin123' with your desired password
hashPassword('admin123');