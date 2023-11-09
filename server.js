const express = require("express");
const app = express();
const userRoutes = require('./src/contoller/user/user.route');
const env = require('dotenv').config();

app.use(express.json()); 
app.use('/user', userRoutes);

app.listen(process.env.PORT, function (err) {
  if (err) console.log(err);
  console.log(`listening to port localhost:4000`);
});

