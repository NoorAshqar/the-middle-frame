const mongoose = require('mongoose');
require('dotenv').config()

const dbURI = process.env.MONGODB || 'mongodb+srv://NoorAshqar:0598489898@cluster0.juw2d.mongodb.net/Hotels?retryWrites=true&w=majority'
var connect = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true, 'useFindAndModify': false })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
}
module.exports = connect;