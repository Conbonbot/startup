const express = require('express');
// TODO: use bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const uuid = require('uuid');
const pluralize = require('pluralize')
const app = express();



// Stocks and users are saved in memory
let users = {};
let stocks = [];

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
    console.log(`Logging out user: ${user}`);
    res.status(204).end();
});

// Get stock information

// Buying order
apiRouter.post('/buy', (req, res) => {
    let message = ``;
    let error = false;
    console.log(req.body);
    if(req.body.amount < 1){
        message = `Number has to be greater than 0`;
        error = true;
    }
    const date = new Date().toLocaleDateString();
    let existStock = false;
    stocks.forEach((stock, index) => {
        if(stock.userName === req.body.userName && stock.ticker === req.body.ticker){
          stocks[index].amount = parseInt(stock.amount) + parseInt(req.body.amount);
          stocks[index].price = Math.random()*100;
          stocks[index].date = date;
          existStock = true;
        }
      });
    if(!existStock){
        const order = {userName: req.body.userName, ticker: req.body.ticker, amount: req.body.amount, price: Math.random()*100, date: date};
        stocks.push(order);
    }
    if(!error){
        message = `${(pluralize('share', req.body.amount, true))} of ${req.body.ticker} bought successfully!`;
    }
    res.send({ error: error, message: message });
});

// Selling order
apiRouter.post('/sell', (req, res) => {
    let message = ``;
    let error = false;
    console.log(req.body);
    if(req.body.amount < 1){
        message = `Number has to be greater than 0`;
        error = true;
    }
    const date = new Date().toLocaleDateString();
    let existStock = false;
    stocks.forEach((stock, index) => {
        if(stock.userName === req.body.userName && stock.ticker === req.body.ticker){
            if(stock.amount < req.body.amount){
                message = `You cannot sell more shares of ${req.body.ticker} than you owe. You can sell up to ${stock.amount} shares of this stock.`;
                error = true;
            }
            else if(stock.amount === req.body.amount){
                stocks.splice(index,1);
                existStock = true;
            }
            else {
                stocks[index].amount = parseInt(stock.amount) - parseInt(req.body.amount);
                stocks[index].date = date;
                existStock = true;
            }
        }
    })
    if(!existStock){
        message = `You do not own any stock with the name: ${req.body.ticker}.`;
    }
    error = !existStock;
    if(!error){
        message = `${(pluralize('share', req.body.amount, true))} of ${req.body.ticker} sold successfully!`;
    }
    res.send({ error: error, message: message });
});

// Display stocks
apiRouter.post('/stocks', (req, res) => {
    console.log(req.body);
    let userStocks = [];
    stocks.forEach((stock, index) => {
        if(stock.userName === req.body.userName){
            userStocks.push(stock);
        }
    });
    console.log("Sending stocks", userStocks);
    res.send(userStocks);
});



app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

