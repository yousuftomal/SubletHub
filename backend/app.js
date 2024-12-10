const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
const path = require('path'); // Import the path module
const cors = require('cors'); // Import the cors package


dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Use the cors middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads directory
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
