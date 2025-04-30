const Item = require('../models/item');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    const newItem = await Item.create(name, description);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    const updatedItem = await Item.update(req.params.id, name, description);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.delete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};