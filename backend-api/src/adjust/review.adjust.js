const knex = require('../db/knex');

function reviews(){
    return knex('reviews');
}

async function readReview(data){
    return {
        userid: data.user_id,
        productid: data.product_id,
        rating: data.rating,
        comment: data.comment,
        created_at: data.created_at,
    }
}

async function makeReview(data){
    const user = await readUser(data);
    const [id] = await reviews().insert(user);
    const insertedReview = await reviews().where({ id }).first();
    return { id, ...insertedReview };
}

async function editReview(id, data){
    const updatedReview = await readReview(data);
    await reviews().where({ id }).update(updatedReview);
    const editedReview = await reviews().where({ id }).first();
    return editedReview;
}

async function deleteReview(id){
    const deletedReview = await reviews().where({ id }).first();
    await reviews().where({ id }).del();
    return deletedReview;
}

module.exports = { 
    makeReview,
    editReview,
    deleteReview
 };

