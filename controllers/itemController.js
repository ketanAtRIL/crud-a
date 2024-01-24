// controllers/itemController.js
const axios = require('axios');
const Item = require('../models/itemModel');
const config = require('../config/config');

const externalApiBaseUrl = config.api.externalApiBaseUrl;

exports.updateItem = async (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  try {
    const response = await axios.put(`${externalApiBaseUrl}/${itemId}`, updatedItem);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 404).json({ error: error.message || 'Item not found' });
  }
};

exports.deleteItem = async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    await axios.delete(`${externalApiBaseUrl}/${itemId}`);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(error.response?.status || 404).json({ error: error.message || 'Item not found' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const response = await axios.get(externalApiBaseUrl);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};
