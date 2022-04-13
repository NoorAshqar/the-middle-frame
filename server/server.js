const express = require('express');
const db = require("./database")
const cors = require("cors")
const path = require("path")

let app = express();

db();

app.use(express.static(__dirname + '/../client/build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/user', require('./routes/user'));
app.use('/reservation', require('./routes/resevation'));

app.get("*", (req, res) => {
  console.log('asdfghjklkjhgfdsasdfghjk -------------------> ', path.join(__dirname, '../client/build', 'index.html'))
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

let port = process.env.PORT || 5000;
const host = 'localhost';

app.listen(port, host, function () {
  console.log(`listening on port ${port}`);
});
