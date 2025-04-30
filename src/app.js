require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/items', itemsRouter);

// HTML Views
app.get('/view', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM items');
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Items List</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          tr:hover { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>Items</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
    `;
    
    result.rows.forEach(item => {
      html += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.description}</td>
        </tr>
      `;
    });
    
    html += `
        </table>
      </body>
      </html>
    `;
    
    res.send(html);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).send('Error fetching data');
  }
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Database connection and server start
db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}`);
      console.log(`Database Viewer: http://localhost:${PORT}/view`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });