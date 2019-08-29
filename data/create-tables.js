const client = require('../lib/client');

client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL
            );

            CREATE TABLE items (
                id SERIAL PRIMARY KEY NOT NULL,
                task VARCHAR(256) NOT NULL UNIQUE,
                inactive BOOLEAN NOT NULL DEFAULT FALSE
            );
        `)

    .then(
        () => console.log('crate tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
    
    