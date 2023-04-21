const Pool = require('pg').Pool 

const pool = new Pool({
    user: 'kate',
    password: '', //no password set
    host: 'localhost',
    port: '',
    database: 'pernbands'
});

module.exports = pool;