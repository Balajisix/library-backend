const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

require('dotenv').config();

const app = express();
app.use(cors({
    origin: "https://balajisix.github.io",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
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