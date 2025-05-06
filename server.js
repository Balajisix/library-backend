const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

require('dotenv').config();

const app = express();
app.use(cors({
  origin: "https://balajisix.github.io/library-management-frontend",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
}));
// app.use(cors());
app.use(express.json());

const MONGO = process.env.MONGO_URI;
mongoose.connect(MONGO)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Error: ", err));

app.use('/api/books', bookRoutes);

module.exports = app;

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server Running ${PORT}`));