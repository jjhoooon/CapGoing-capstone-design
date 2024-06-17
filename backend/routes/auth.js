module.exports = function (passport) {
    const bkfd2Password = require('pbkdf2-password');
    const hasher = bkfd2Password();
    const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); // 사용자 미들웨어
    const route = require('express').Router();
    const conn = require('../mysql/db')();

    route.post('/register', function (req, res) {
        hasher({ password: req.body.password }, function (err, pass, salt, hash) {
            var user = {
                authId: 'user' + req.body.username,
                username: req.body.username,
                password: hash,
                salt: salt,
                displayName: req.body.displayName,
            };
            var sql = 'INSERT INTO user SET ?';
            conn.query(sql, user, function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else {
                    req.login(user, function (err) {
                        req.session.save(function () {
                            res.redirect('/welcome');
                        });
                    });
                }
            });
        });
    });


    route.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ message: 'Login successful' });
            });
        })(req, res, next);
    });

    route.get('/logout', isLoggedIn, function (req, res) {
        req.logout(function (err) {
            if (err) {
                return res.status(500).send('Failed to log out');
            }
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Failed to destroy session');
                }
                res.send('User deleted and logged out successfully');
            });
        });
    });

    route.delete('/user/delete', isLoggedIn, (req, res) => {
        const authId = req.user.authId;

        const deleteUserSql = 'DELETE FROM user WHERE authId = ?';
        conn.query(deleteUserSql, [authId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to delete user');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('User not found');
            }


            req.logout(function (err) {
                if (err) {
                    return res.status(500).send('Failed to log out');
                }

                req.session.destroy((err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Failed to destroy session');
                    }
                    res.send('User deleted and logged out successfully');
                });
            });
        });
    });

    return route;
};