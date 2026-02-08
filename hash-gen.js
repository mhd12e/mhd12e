const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('Hello$2012', 10);
console.log(hash);
