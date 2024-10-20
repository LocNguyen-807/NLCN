const { faker } = require('@faker-js/faker');

function createProduct(categoryId) {
    const categoryProducts = {
        1: ['Gaming Keyboard', 'Mechanical Keyboard', 'Wireless Keyboard'],
        3: ['Noise Cancelling Headphones', 'Bluetooth Headphones', 'Gaming Headset'],
        5: ['Wireless Mouse', 'Gaming Mouse', 'Ergonomic Mouse'],
        7: ['Mouse Pad', 'Microphone', 'Webcam', 'USB Hub', 'Gaming Chair']
    };

    if (!categoryProducts[categoryId]) {
        throw new Error(`Invalid categoryId: ${categoryId}`);
    }

    const productName = faker.helpers.arrayElement(categoryProducts[categoryId]);

    return {
        name: productName,
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(10, 500, 2),
        img: faker.image.url(), // Use a valid function to generate image URLs
        category_id: categoryId,
        created_at: faker.date.past()
    }
}

exports.seed = async function(knex) {
    await knex('products').del();
    await knex.raw('ALTER TABLE products AUTO_INCREMENT = 1'); // Reset auto-increment
    const categories = [1, 3, 5, 7]; // Correct category IDs
    const products = categories.flatMap(categoryId => 
        Array.from({ length: 10 }, () => createProduct(categoryId))
    );
    await knex('products').insert(products);
}
