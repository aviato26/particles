
let express = require('express');
let app = express();

app.use(express.static('clientside'))

app.listen(5000, console.log('server is up and running'));
