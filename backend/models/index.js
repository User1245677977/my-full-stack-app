<<<<<<< HEAD
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const accountRoutes = require('./routes/account');

app.use(express.json());
app.use('/api/account', accountRoutes);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
=======
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const accountRoutes = require('../routes/account');


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use("/create-account", accountRoutes);

>>>>>>> 95b66fda (Fix backend index.js with proper route import)
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

<<<<<<< HEAD
console.log('Database URL:', process.env.DATABASE_URL);
=======
// Log database URL for debugging purposes
console.log("Database URL:", process.env.DATABASE_URL);
>>>>>>> 95b66fda (Fix backend index.js with proper route import)
