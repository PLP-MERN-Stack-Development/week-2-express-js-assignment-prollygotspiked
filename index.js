const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use(authenticate);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
