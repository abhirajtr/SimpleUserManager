const express = require('express');
const logger = require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');

const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');

require('dotenv').config();
require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'partials')
])

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session configuration
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 3,
        httpOnly: true
    }
}))
app.use(nocache())

app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong') 
})

app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}/auth`));