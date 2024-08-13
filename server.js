const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const employeesRouter = require('./routes/employees');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

app.use('/employees', employeesRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})


