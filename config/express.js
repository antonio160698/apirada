const express    = require('express')
const bodyParser = require('body-parser')
const session    = require('express-session')
const jsend      = require('jsend')

module.exports = (app) => {  

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.header('Content-Type', 'application/json');
        next();
    });
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(session({ secret: 'codo',
                      saveUninitialized: true,
                      resave: true
                    }));

    app.use(jsend.middleware)

}
