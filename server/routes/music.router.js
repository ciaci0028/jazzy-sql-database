// Require the pertinent elements
const pg = required('pg');
const express = require('express');
const router = express.Router();

// Pool as our connection to database
const pool = new pg.Pool({
    database: 'jazzy_sql',

    host: 'localhost',
    port: 5432,
});