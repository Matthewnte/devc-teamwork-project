const { Pool } = require('pg');

const pool = new Pool({
    user: 'Nte',
    password: '@mixuperr1',
    host: 'localhost',
    database: 'TeamworkDB',
})

module.exports = pool;