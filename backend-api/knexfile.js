require('dotenv').config();
const { DB_HOST, DB_PASS, DB_NAME, DB_USER, DB_PORT } = process.env;

/**
 * @type { import ("knex").Knex.Config }
 */

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: DB_HOST,
            password: DB_PASS,
            user: DB_USER,
            database: DB_NAME,
            port: DB_PORT
        },
        pool: {
            min: 0,
            max: 10
        },
        seeds: {
            directory: './seeds'
        }
    },
};