module.exports = function (passport) {
    const route = require('express').Router();
    const { isLoggedIn } = require('./middlewares');
    const conn = require('../mysql/db')();


    route.post('/recipe/save', isLoggedIn, async (req, res) => {
        try {
            const user_id = req.user.authId;

            'SELECT id FROM coffeeinfo ORDER BY id DESC LIMIT 1';
            const sql_coffeeinfo =
                'SELECT * FROM coffeeinfo ORDER BY id DESC LIMIT 1';

            const getLastCoffeeInfo = () => {
                return new Promise((resolve, reject) => {
                    conn.query(sql_coffeeinfo, (err, results) => {
                        if (err) {
                            reject(err);
                        } else if (results.length > 0) {
                            resolve(results[0].id);
                        } else {
                            reject('No coffee info found');
                        }
                    });
                });
            };

            const coffeeinfo_id = await getLastCoffeeInfo();

            const {
                dose,
                water_temperature,
                bloom_pouring_time,
                bloom_water_quantity,
                bloom_extraction_time,
                first_pouring_time,
                first_water_quantity,
                first_extraction_time,
                second_pouring_time,
                second_water_quantity,
                second_extraction_time,
                third_pouring_time,
                third_water_quantity,
                third_extraction_time,
            } = req.body;
            var sql = `INSERT INTO recipe (dose, water_temperature, 
        bloom_pouring_time, bloom_water_quantity, bloom_extraction_time,
        first_pouring_time, first_water_quantity, first_extraction_time,
        second_pouring_time, second_water_quantity, second_extraction_time,
        third_pouring_time, third_water_quantity, third_extraction_time, user_id, coffeeinfo_id, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
            conn.query(
                sql,
                [
                    dose,
                    water_temperature,
                    bloom_pouring_time,
                    bloom_water_quantity,
                    bloom_extraction_time,
                    first_pouring_time,
                    first_water_quantity,
                    first_extraction_time,
                    second_pouring_time,
                    second_water_quantity,
                    second_extraction_time,
                    third_pouring_time,
                    third_water_quantity,
                    third_extraction_time,
                    user_id,
                    coffeeinfo_id,
                ], //third_pouring_time
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('SQL Query Failed to save recipe');
                    } else {
                        res.send('recipe saved successfully');
                    }
                }
            );
        } catch (error) {
            res.status(500).send('Failed to save user recipe');
        }
    });

    route.get('/user/info', isLoggedIn, (req, res) => {
        res.json({
            displayName: req.user.displayName,
            authId: req.user.authId,
        });
    });

    route.get('/user/recipes', isLoggedIn, async (req, res) => {
        const authId = req.user.authId;
        var sql = `SELECT * FROM recipe
      INNER JOIN coffeeinfo ON recipe.coffeeinfo_id = coffeeinfo.id
      WHERE recipe.user_id = ? AND recipe.user_id = coffeeinfo.user_id;`;

        conn.query(sql, [authId], function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        });
    });

    route.get('/user/recipes/:id', isLoggedIn, async (req, res) => {
        var recipe_id = req.params.id;
        const authId = req.user.authId;
        const sql = `SELECT * FROM recipe
      INNER JOIN coffeeinfo ON recipe.coffeeinfo_id = coffeeinfo.id
      WHERE recipe.user_id = coffeeinfo.user_id
      AND recipe.id = ?
      AND recipe.user_id = ?;`;
        conn.query(sql, [recipe_id, authId], function (err, rows, fields) {
            if (err) console.log(err);
            else {
                res.json(rows);
            }
        });
    });

    route.delete('/recipe/:id', isLoggedIn, async (req, res) => {
        var recipe_id = req.params.id;
        var sql = 'DELETE from recipe where coffeeinfo_id=? AND user_id=?';
        conn.query(sql, [recipe_id, req.user.authId], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send('Failed to delete recipe');
            } else if (result.affectedRows === 0) {
                res
                    .status(404)
                    .send(
                        'Recipe not found or you do not have permission to delete this recipe'
                    );
            } else {
                res.send('Recipe deleted successfully');
            }
        });
    });

    return route;
};