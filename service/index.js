const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const uuid = require('uuid');
const app = express();



// Stocks and users are saved in memory
let users = {};
let stocks = {};

// The service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Create a new user
apiRouter.post('/auth/create', async(req, res) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const user = users[req.body.email];
    if(user) {
        res.status(409).send({ msg: 'This user already exists'});
    }
    else if(!emailRegex.test(req.body.email)){
        res.status(409).send({ msg: 'Username does not follow an email pattern'});
    }
    else {
        const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
        users[user.email] = user;
        res.send({ token: user.token });
    }
});


// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email]
    console.log(user);
    if(user){
        if(req.body.password === user.password){
            user.token = uuid.v4();
            res.send({ token: user.token });
            return;
        }
    }
    else {
        res.status(401).send({ msg: 'This user does not exist' });
        return;
    }
    res.status(401).send({ msg: 'The password is incorrect'});
});

// Delete a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.token);
    if(user) {
        delete user.token;
    }
    res.status(204).end();
});

// Get stock information

// Buying order
apiRouter.post('/buy', (req, res) => {
    console.log(req.body);
    stocks = req.body;
    res.send(stocks);
});

// Selling order
apiRouter.post('/sell', (req, res) => {
    console.log(req.body);
    stocks = req.body;
    res.send(stocks);
});


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

