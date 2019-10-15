const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const notFoundHandler = require('./middleware/notFoundHandler');
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/pokemon", pokemon)

app.use(notFoundHandler);

app.listen(3000, () => {
    console.log("Server is running...");
});
