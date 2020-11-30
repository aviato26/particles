
let express = require('express');
let three = require('three');
let app = express();

exports.three = three;

app.use(express.static('clientside'))

app.listen(5000, console.log('server is up and running on port 5000'));
