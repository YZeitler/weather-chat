var express = require('express');
var app = express();
app.listen(8050);

app.use(express.static('public'));
app.use(express.static('node_modules'));


app.get('/', function(request, response) {
    response.send("Hey, hello from the server!");
});