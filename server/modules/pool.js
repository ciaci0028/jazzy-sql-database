// Require the pertinent elements
const pg = require('pg');

// Pool as our connection to database
const pool = new pg.Pool({
    database: 'jazzy_sql',

    host: 'localhost',
    port: 5432,
});

module.exports = pool;