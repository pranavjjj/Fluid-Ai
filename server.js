const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres-service',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_NAME || 'appdb',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send({ status: 'success', message: 'Fluid AI Stack Active' });
});

app.get('/healthz', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).send({ status: 'healthy', db: 'connected' });
  } catch (err) {
    console.error('DB Connection Error:', err.message); // Added console logging
    res.status(500).send({ status: 'unhealthy', db: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
