const knex = require('../db/knex');

function inventory(){
    return knex('inventory');
}

async function readInventory(data){
    return {
        product_id: data.product_id,
        stock_quantity: data.stock_quantity,
        restock_quantity: data.restock_quantity,
        restock_level: data.restock_level,
        last_restock_date: data.last_restock_date,
    }
}

async function getAllInventory(){
    return await inventory().select('*');
}

async function makeInventory(data){
    const [id] = await inventory().insert(data);
    const insertedInventory = await inventory().where({ id }).first();
    return { id, ...insertedInventory };
}

async function editInventory(id, data){
    await inventory().where({ id }).update(data);
    const editedInventory = await inventory().where({ id }).first();
    return editedInventory;
}

async function deleteInventory(id){
    const deletedInventory = await inventory().where({ id }).first();
    await inventory().where({ id }).delete();
    return deletedInventory;
}

module.exports = {
    readInventory,
    getAllInventory,
    makeInventory,
    editInventory,
    deleteInventory,
    getTopSellingProducts,
}

