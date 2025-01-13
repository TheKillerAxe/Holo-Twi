require('dotenv').config();

const twi = require('./app/bot/bot');
const express = require('express');

const app = express();
const port = 8081;

app.use('/css', express.static('./assets/css'));
app.use('/js', express.static('./assets/js'));
app.use('/img', express.static('./assets/img'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes/rts_routes'));

app.listen(port, () => {
    console.log('Server is running...');
    twi.botLogIn();
});