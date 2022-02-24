const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Mount Routes
const logs = require('./routes/logs');

// Use Routes
app.use('/api/logs', logs);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
