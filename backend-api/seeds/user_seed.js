const { faker } = require('@faker-js/faker');

function createUser() {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        phone: faker.phone.number('09########'),
        address: faker.location.streetAddress(true),
        avatar: faker.image.avatar(),
        role_id: faker.helpers.arrayElement([1, 2]), // Assuming 1 for 'admin' and 2 for 'user'
        created_at: faker.date.past()
    }
}

exports.seed = async function(knex) {
    await knex('users').del();
    await knex.raw('ALTER TABLE users AUTO_INCREMENT = 1'); // Reset auto-increment
    await knex('users').insert(Array.from({ length: 50 }, createUser));
}
