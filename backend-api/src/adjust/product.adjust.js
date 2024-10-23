const knex = require('../db/knex');
const Paginator = require('./paginator');

function products(){
    return knex('products');
}

async function readProduct(data){
    return {
        name: data.name,
        description: data.description,
        price: data.price,
        img: data.img,
        category_id: data.category_id,
        created_at: data.created_at,
        updated_at: data.updated_at
    }
}

async function getAllProducts(query){
    const { page, limit } = query;
    const paginator = new Paginator(page, limit);
    const { offset, limit: limitPaginator } = paginator;    
    let results = await products().select(knex.raw('count(id) OVER() as total'),
    'id',
    'name',
    'description',
    'price',
    'img',
    'category_id',
    'created_at',
    'updated_at')
    .limit(limitPaginator)
    .offset(offset);

    let totalRecords = 0;
    results = results.map(result => {
        totalRecords = result.total;
        delete result.total;
        return result;
    });
    return {
        products: results,
        metadata: paginator.getMetadata(totalRecords)
    }
}

async function getProductById(id){
    return await products().where({ id }).first();
}



async function createProduct(data){
    const product = await readProduct(data);
    const [id] = await products().insert(product);
    const insertedProduct = await products().where({ id }).first();
    return { id, ...insertedProduct };
}

async function editProduct(id, data){
    const updatedProduct = await readProduct(data);
    await products().where({ id }).update(updatedProduct);
    const editedProduct = await products().where({ id }).first();
    return editedProduct;
}

async function deleteProduct(id){
    const deletedProduct = await products().where({ id }).first();
    await products().where({ id }).del();
    return deletedProduct;
}

async function getTopSellingProductsByCategory(categoryId, limit) {
    const knex = require('../db/knex');
    
    return await knex('products as p')
        .join('inventory as i', 'p.id', 'i.product_id')
        .select(
            'p.id',
            'p.name',
            'p.description',
            'p.price',
            'p.img',
            'p.category_id',
            'i.sold_quantity',
            'i.stock_quantity',
            knex.raw('CAST(i.sold_quantity AS FLOAT) / NULLIF(i.restock_quantity, 0) as sell_ratio')
        )
        .where('p.category_id', categoryId)
        .orderBy('i.sold_quantity', 'desc')
        .limit(limit);
}

module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
    editProduct,
    deleteProduct,
    getTopSellingProductsByCategory
}

