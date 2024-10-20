const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);
db.raw('SELECT(1)').then(() => {
    console.log("Đã kết nối csdl")
}).catch((err) => {
    console.error("Lỗi khi kết nối csdl", err);
})


module.exports = db;