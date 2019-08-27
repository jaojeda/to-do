
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

client.connect();

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors()); 
app.use(express.static('public')); 
app.use(express.json()); 

app.get('/api/items', (req, res) => {
    const showAll = (req.query.show && req.query.show.toLowerCase() === 'all');
    const where = showAll ? '' : 'WHERE inactive = FALSE';

    client.query(`
        SELECT
            id,
            task,
            inactive
        FROM items
        ${where}
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });  
});

app.post('/api/items', (req, res) => {
    const item = req.body;
    client.query(`
        INSERT INTO items (task)
        VALUES ($1)
        RETURNING *;
    `,
    [item.task]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Item "${item.task}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.put('api/items/:id', (req, res) => {
    const id = req.params.id;
    const item = req.body;
    
    client.query(`
        UPDATE types
        SET    task = $2,
            inactive = $3
        WHERE  id = $1
        RETURNING *;
    `,
    [id, item.task, item.inactive]
    )  
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Item "${item.task}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });

});

app.delete('api/items/:id', (req,res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM types
        WHERE  id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23503') {
                res.status(400).json({
                    error: `Could not remove, task is unfinished. Mark as complete first before deleting.`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});