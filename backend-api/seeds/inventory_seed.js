/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trước khi thêm dữ liệu mới
  await knex('inventory').del();
  
  // Lấy danh sách product_id hiện có từ bảng products
  const products = await knex('products').select('id');
  
  // Tạo dữ liệu inventory cho mỗi sản phẩm
  const inventoryData = products.map(product => ({
    product_id: product.id,
    stock_quantity: Math.floor(Math.random() * 100) + 20, // Số lượng tồn kho ngẫu nhiên từ 20-120
    restock_level: 10,
    restock_quantity: Math.floor(Math.random() * 50) + 10, // Số lượng nhập thêm ngẫu nhiên từ 10-60
    sold_quantity: Math.floor(Math.random() * 30), // Số lượng đã bán ngẫu nhiên từ 0-30
    last_restock_date: new Date(),
    created_at: new Date()
  }));

  // Chèn dữ liệu vào bảng inventory
  await knex('inventory').insert(inventoryData);
};
