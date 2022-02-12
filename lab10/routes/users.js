const express = require("express");
const router = express.Router()
const userData = require('../data/users');
const session = require('express-session');



/*router.use(session({
    name: 'AuthCookie',
    secret: 'my secret santa banta',
    resave: false,
    saveUninitialized: true
}));*/



/*const isLoggedIn = function (req) {
    return !!req.session.user;
};*/
/*
// logging middleware
const logger = function (req, res, next) {
    console.log(`[${new Date().toUTCString()}]: ${req.method}\t${req.originalUrl}\t\t${isLoggedIn(req) ? 'Authenticated User' : 'Non-Authenticated User'}`);
    next()
};
router.use(logger);*/


router.get('/', function (req, res) {
    if (req.session.user) {
        res.redirect('/private')
    } else {
        res.render('users/login', { title: "Login" })
    }
});


router.get('/signup', function (req, res) {
    if (req.session.user) {
        res.redirect('/private')
    } else {
        res.render('users/signup', { title: "Signup" })
    }
});


router.post('/signup', async (req, res) => {
    let resInfo = req.body;


    try {
        if (!resInfo.username) {
            throw "No input has been given for username ";
        }
        if (!resInfo.password) {
            throw "No input has been given for password ";
        }

        if (typeof (resInfo.username) != 'string') {
            throw 'username should be a string';
        }

        if (typeof (resInfo.password) != 'string') {
            throw 'password should be a string';
        }

        if (resInfo.username.length === 0) {
            throw 'username cannot be a empty string';
        }
        if (resInfo.password.length === 0) {
            throw 'password cannot be a empty string';
        }

        if (resInfo.username.trim().length === 0) {
            throw 'username cannot be just empty spaces';
        }

        if (resInfo.password.trim().length === 0) {
            throw 'password cannot be just empty spaces';
        }

        if (resInfo.username.length < 4) {
            throw 'username should contain at least 4 characters';
        }

        if (/\s/.test(resInfo.username)) {
            throw 'username has white spaces';
        }

        if (resInfo.password.length < 6) {
            throw 'password should contain at least 6 characters';
        }

        if (/\s/.test(resInfo.password)) {
            throw 'password has white spaces';
        }

        //let pattern = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
        //if (!resInfo.username.match(pattern)) {
          //  throw 'username should contain only alphanumeric characters';
        //}
        let pattern = /^[a-zA-Z0-9_]*$/;
    if (!resInfo.username.match(pattern)) {
        throw 'username should contain only alphanumeric characters';
    }

    }
    catch (e) {
        res.status(400);
        res.render('users/signup', { title: "Error", error: e })
        return;
    }

    try {
        const postUser = await userData.createUser(resInfo.username, resInfo.password);
        if (postUser) {
            res.redirect('/')
        } else {
            res.status(500);
        }
    } catch (e) {
        res.status(400);
        res.render('users/signup', { title: "Error", error: e })
    }
});

router.post('/login', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private')
    }
    let resInfo = req.body;

    try {
        if (!resInfo.username) {
            throw "No input has been given for username ";
        }
        if (!resInfo.password) {
            throw "No input has been given for password ";
        }

        if (typeof (resInfo.username) != 'string') {
            throw 'username should be a string';
        }

        if (typeof (resInfo.password) != 'string') {
            throw 'password should be a string';
        }

        if (resInfo.username.length === 0) {
            throw 'username cannot be a empty string';
        }
        if (resInfo.password.length === 0) {
            throw 'password cannot be a empty string';
        }

        if (resInfo.username.trim().length === 0) {
            throw 'username cannot be just empty spaces';
        }

        if (resInfo.password.trim().length === 0) {
            throw 'password cannot be just empty spaces';
        }

        if (resInfo.username.length < 4) {
            throw 'username should contain at least 4 characters';
        }

        if (/\s/.test(resInfo.username)) {
            throw 'username has white spaces';
        }

        if (resInfo.password.length < 6) {
            throw 'password should contain at least 6 characters';
        }

        if (/\s/.test(resInfo.password)) {
            throw 'password has white spaces';
        }

//        let pattern = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
  //      if (!resInfo.username.match(pattern)) {
    //        throw 'username should contain only alphanumeric characters';
      //  }
        let pattern = /^[a-zA-Z0-9_]*$/;
        if (!resInfo.username.match(pattern)) {
            throw 'username should contain only alphanumeric characters';
        }


    }
    catch (e) {
        res.status(400);
        res.render('users/login', { title: "Error", error: e })
        return;
    }
    try {
        const postUser = await userData.checkUser(resInfo.username, resInfo.password);
        if (postUser) {
            req.session.user = resInfo.username.toLowerCase();
            res.redirect('/private')
        } else {
            res.status(500);
        }
    } catch (e) {
        res.status(400);
        res.render('users/login', { title: "Error", error: e })
    }
});

/*
// authentication middleware
router.use('/private', function (req, res, next) {
    if (isLoggedIn(req)) {
        next()
    } else {
        res.status(403);
        res.render('users/error', { title: "Error" })
    }
});*/

router.get('/private', async (req, res) => {
    try {
        res.render('users/private', { title: "Private", data: req.session.user })
    } catch (e) {
        res.status(400);

    }
});



router.get('/logout', function (req, res) {

    res.clearCookie("AuthCookie");
    req.session.destroy();
        res.render('users/logout', { title: "Logout" })
   
});


module.exports = router;
