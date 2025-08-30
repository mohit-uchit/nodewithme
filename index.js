require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const connectDb = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes')

const app = express();
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGO_URI;

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
connectDb(dbUri);

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.listen(port, () => {
  console.log('The server is running on the port : ', 3000);
});
