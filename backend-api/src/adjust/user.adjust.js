const knex = require('../db/knex');
const Paginator = require('./paginator');

function users(){
    return knex('users');
}

async function readUser(data){
    return {
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        address: data.address,
        avatar: data.avatar,
        role_id: data.role_id,
        created_at: data.created_at,
        updated_at: data.updated_at
    }
}

async function makeUser(data){    
    const user = await readUser(data);
    const [id] = await users().insert(user);
    const insertedUser = await users().where({ id }).first(); // Lấy thông tin người dùng vừa được chèn
    return { id, ...insertedUser }; // Trả về thông tin đầy đủ của người dùng
}

async function editUser(id, data) {
    const updatedUser = await readUser(data);
    await users().where({ id }).update(updatedUser);
    const editedUser = await users().where({ id }).first();
    return editedUser;
}

async function deleteUser(id) {
    const deletedUser = await users().where({ id }).first();
    await users().where({ id }).del();
    return deletedUser;
}

async function getAllUsers(query){
    const { page, limit } = query;
    const paginator = new Paginator(page, limit);
    const { offset, limit: limitPaginator } = paginator;
    let results = await users().select(knex.raw('count(id) OVER() as total'),
    'id',
    'username',
    'email',
    'phone',
    'address',
    'avatar',
    'role_id',
    'created_at'
)
    .limit(limitPaginator)
    .offset(offset);

    let totalRecords = 0;
    results = results.map(result => {
        totalRecords = result.total;
        delete result.total;
        return result;
    });
    
    return{
        metadata: paginator.getMetadata(totalRecords),
        users: results
    }
}

module.exports = {
    makeUser,
    getAllUsers,
    editUser,
    deleteUser
}
