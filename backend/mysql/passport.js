module.exports = function (app) {
    const conn = require('./db')();
    const bkfd2Password = require('pbkdf2-password');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const hasher = bkfd2Password();

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.authId);
    });

    passport.deserializeUser(function (authId, done) {
        var sql = 'SELECT * FROM user WHERE authId=?';
        conn.query(sql, [authId], function (err, results) {
            if (err) {
                console.log(err);
                done('There is no user');
            } else {
                done(null, results[0]);
            }
        });
    });

    passport.use(
        new LocalStrategy(function verify(username, password, cb) {
            var uname = username;
            var pwd = password;
            var sql = 'SELECT * FROM user WHERE authId=?';
            conn.query(sql, ['user' + uname], function (err, results) {
                console.log(results);
                if (err) {
                    return cb('There is no user');
                }
                var user = results[0];
                console.log(user);
                return hasher(
                    { password: pwd, salt: user.salt },
                    function (err, pass, salt, hash) {
                        if (hash === user.password) {
                            return cb(null, user);
                        } else {
                            return cb(null, false);
                        }
                    }
                );
            });
        })
    );
    return passport;
};