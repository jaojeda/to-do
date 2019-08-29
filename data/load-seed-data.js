const client = require('../lib/client');
const tasks = require('./tasks');

Promise.all(
    tasks.map(type => {
        return client.query(`
            INSERT INTO items (task)
            VALUES ($1)
            RETURNING *;
        `,
        [type])
            .then(result => result.rows[0]);
    })
)
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });