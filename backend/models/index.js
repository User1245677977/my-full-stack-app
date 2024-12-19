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
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('Database URL:', process.env.DATABASE_URL);
