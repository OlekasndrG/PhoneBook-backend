const app = require('./app');



const mongoose = require('mongoose');
const { DB_HOST, PORT = 3001 } = process.env;

mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Database connection successful port ${PORT}`);
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
