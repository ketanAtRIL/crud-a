// app.js
const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const config = require('./config/config');
const path = require('path');

const app = express();

app.use(bodyParser.json());


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/items', itemRoutes);

// Error Middleware
app.use(errorMiddleware.handleErrors);

const port = config.api.port;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
