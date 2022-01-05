// Beginning elements
const pg = require('pg');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`In /songs GET`);

    // write SQL query/statement
    const queryText = `
        SELECT "title", "length",
        to_char("released", 'Mon fmDDth, YYYY') AS "released"
        FROM "song" 
        ORDER BY UPPER("title");
    `;
    // Send SQL to database
    pool.query(queryText)
        .then( (dbRes) => {
            res.send(dbRes.rows);
        })
        .catch( (err) => {
            console.log('get /song failed', err);

            // Tell the client
            res.sendStatus(500);
        });

});

router.post('/', (req, res) => {
    let queryText = `
        INSERT INTO "song"
            ("title", "length", "released")
        VALUES
            ($1, $2, $3)
    `;

    // Defining parameters for placeholders
    let queryParams = [
        req.body.title,     // $1
        req.body.length,    // $2
        req.body.released,   // $3
    ];

    // Using pool to pass whole thing through
    pool.query(queryText, queryParams)
        .then( (dbRes) => {
            res.sendStatus(201);
        })
        .catch( (err) => {
            console.log('/song post failed', err);
            res.sendStatus(500);
        });
});

// Export
module.exports = router;