const mongoose = require('mongoose');

const app = require('./main');

mongoose.connect("mongodb://localhost:27017/yu").then(() => console.log("Database connected!")).catch(err => console.log(err));
app.listen(8080, () => console.log('listening'))
