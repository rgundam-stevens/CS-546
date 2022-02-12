








const express = require('express');
const session = require('express-session');
const app = express();
//const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
app.use(session({
    name: 'AuthCookie',
    secret: 'my secret santa banta',
    resave: false,
    saveUninitialized: true
}));

const exphbs = require('express-handlebars');

//app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use('/private', function (req, res, next) {
    if (isLoggedIn(req)) {
        next()
    } else {
        res.status(403);
        res.render('users/error', { title: "Error" })
    }
});
const isLoggedIn = function (req) {
    return !!req.session.user;
};

// logging middleware
const logger = function (req, res, next) {
    console.log(`[${new Date().toUTCString()}]: ${req.method}\t${req.originalUrl}\t\t${isLoggedIn(req) ? 'Authenticated User' : 'Non-Authenticated User'}`);
    next()
};

app.use(logger);

configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});




