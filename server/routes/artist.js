// Beginning elements
const pg = require('pg');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Moving it over from server.js

router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    
    // write SQL query/statement
    const queryText = `
        SELECT "name", 
        to_char("birthdate", 'Mon fmDDth, YYYY') AS "birthdate" 
        FROM "artist" 
        ORDER BY "birthdate" DESC;
    `;
    // Send SQL to database
    pool.query(queryText)
        .then( (dbRes) => {
            console.log('dbRes', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch( (err) => {
            console.log('get /artist failed', err);

            // Tell the client
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('post /artist req.body', req.body);

    let queryText = `
        INSERT INTO "artist"
            ("name", "birthdate")
        VALUES
            ($1, $2)
    `;

    // Defining parameters for placeholders
    let queryParams = [
        req.body.name,      // $1
        req.body.birthdate, // $2
    ];

    // Using pool to pass whole thing through
    pool.query(queryText, queryParams)
        .then( (dbRes) => {
            res.sendStatus(201);
        })
        .catch( (err) => {
            console.log('/artist post failed', err);
            res.sendStatus(500);
        });
});

// Export
module.exports = router;