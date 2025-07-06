const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors/CustomErrors');
const validateProduct = require('../middleware/validateProduct');

let products = [];

router.get('/', (req, res) => {
  let filtered = [...products];
  const { category, page = 1, limit = 10 } = req.query;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + +limit);

  res.json({ total: filtered.length, data: paginated });
});

router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'Missing search query' });

  const results = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(results);
});

router.get('/stats', (req, res) => {
  const stats = {};
  for (let product of products) {
    stats[product.category] = (stats[product.category] || 0) + 1;
  }
  res.json(stats);
});

router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;

