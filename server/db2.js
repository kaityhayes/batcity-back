//upcoming 
const Pool = require('pg').Pool 

const pool2 = new Pool({
    user: 'kate',
    password: '',
    host: 'localhost',
    port: '',
    database: 'upcoming'
});

module.exports = pool2;



