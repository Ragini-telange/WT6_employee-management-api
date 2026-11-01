const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Employee Management API is running',
    endpoints: {
      employees: '/api/employees',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

app.use('/api/employees', employeeRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
