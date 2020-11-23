const express = require("express");
const db = require('./config/database');
const exphbs = require("express-handlebars");
const _handlebars = require("handlebars");
const bodyParser = require("body-parser");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require("path");


// test DB
db.authenticate()
    .then(() => console.log(' Database connected...'))
    .catch((err) => console.log('Error: ', err))

const app = express();

//  body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, './public')));

//  Handlebars to render html template into nodeJs
app.engine('handlebars', exphbs({ handlebars: allowInsecurePrototypeAccess(_handlebars), defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, './views'));

// index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gigs route
// app.use('/', require('./routes/test'));
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
