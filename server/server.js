const express = require('express');
const pool = require('./modules/pool');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});


const router = express.Router();



// TODO - Replace static content with a database tables
// const artistList = [ 
//     {
//         name: 'Ella Fitzgerald',
//         birthdate: '04-25-1917'
//     },
//     {
//         name: 'Dave Brubeck',
//         birthdate: '12-06-1920'
//     },       
//     {
//         name: 'Miles Davis',
//         birthdate: '05-26-1926'
//     },
//     {
//         name: 'Esperanza Spalding',
//         birthdate: '10-18-1984'
//     },
// ]
// const songList = [
//     {
//         title: 'Take Five',
//         length: '5:24',
//         released: '1959-09-29'
//     },
//     {
//         title: 'So What',
//         length: '9:22',
//         released: '1959-08-17'
//     },
//     {
//         title: 'Black Gold',
//         length: '5:17',
//         released: '2012-02-01'
//     }
// ];

app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);
    
    // write SQL query/statement
    const queryText = 'SELECT * FROM "artist" ORDER BY "birthdate" DESC;';
    // Send SQL to database
    pool.query(queryText)
        .then( (dbRes) => {
            res.send(dbRes.rows);
        })
        .catch( (err) => {
            console.log('get /artist failed', err);

            // Tell the client
            res.sendStatus(500);
        });
});

app.post('/artist', (req, res) => {
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

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);

    // write SQL query/statement
    const queryText = 'SELECT * FROM "song" ORDER BY "title";';
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

app.post('/song', (req, res) => {
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


