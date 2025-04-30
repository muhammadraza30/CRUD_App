const { query } = require('../db');

class Item {
  static async getAll() {
    const result = await query('SELECT * FROM items ORDER BY id');
    return result.rows;
  }

  static async getById(id) {
    const result = await query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(name, description) {
    const result = await query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  }

  static async update(id, name, description) {
    const result = await query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Item;