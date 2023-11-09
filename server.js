const express = require("express");
const app = express();
const userRoutes = require('./src/contoller/user/user.route');

app.use(express.json()); 
app.use('/user', userRoutes);

app.listen(4000, function (err) {
  if (err) console.log(err);
  console.log(`listening to port localhost:4000`);
});

