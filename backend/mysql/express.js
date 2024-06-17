module.exports = function () {
    const express = require('express');
    const bodyParser = require('body-parser');
    require('dotenv').config();

    const cors = require('cors');

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const session = require('express-session');
    const MySQLStore = require('express-mysql-session')(session);
    const MYSQL_HOST = process.env.MYSQL_HOST;
    const MYSQL_USER = process.env.MYSQL_USER;
    const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
    const MYSQL_DB = process.env.MYSQL_DB;

    const corsOptions = {
        origin: true,
        credentials: true,
    };

    app.use(cors(corsOptions));

    app.use(
        session({
            secret: 'qenjwnefwefbwefjewjfw@!3f2r#R@$#$',
            resave: false,
            saveUninitialized: false,
            proxy: true,
            store: new MySQLStore({
                host: MYSQL_HOST,
                port: 3306,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DB,
            }),
            cookie: {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                domain: '.brewbuzzrecipe.com',
            },
        })
    );

    return app;
};