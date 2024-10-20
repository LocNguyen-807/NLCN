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

module.exports = {
    getAllProducts,
    createProduct,
    editProduct,
    deleteProduct
}

