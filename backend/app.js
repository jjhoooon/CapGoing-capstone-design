const app = require('./mysql/express')();
const port = 8000;


const passport = require('./mysql/passport')(app);
const auth = require('./routes/auth')(passport);
const recipe = require('./routes/recipe')(passport);
const mypage = require('./routes/mypage')(passport);

app.use('/auth/', auth);
app.use(recipe);
app.use(mypage);

app.get('/welcome', function (req, res) {
    if (req.user && req.user.displayName) {
        res.send(`
    <h1>Hello, ${req.user.displayName}</h1>
    <a href="/auth/logout">logout</a>
    `);
    } else {
        res.send(`
    <h1>Welcome</h1>
    <ul>
      <li><a href="/auth/login">Login</a><li>
      <li><a href="/auth/register">Register</a><li>
    </ul>
    `);
    }
});

app.listen(port, function () {
    console.log(`Server running at http://localhost:${port}`);
});