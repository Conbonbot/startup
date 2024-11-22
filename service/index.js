const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const pluralize = require('pluralize')
const DB = require('./database.js');

const authCookieName = 'token';

const fs = require('fs');
const key = fs.readFileSync("./FMP_key.pem", { encoding: "utf8" });

// The service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Use the cookie parser for tracking authentication
app.use(cookieParser());

// Trust forwarded headers
app.set('trust proxy', true);

// Router
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// This holds real time stock data (held in an array to avoid excess API calls)
let realStocks = [];


// Create a new user
apiRouter.post('/auth/create', async(req, res) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(req.body.email)){
        res.status(409).send({ msg: 'Username does not follow an email pattern'});
    }
    if(await DB.getUser(req.body.email)){
        res.status(409).send({ msg: 'This user already exists'});
    }
    else {
        const user = await DB.createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id
        });
    }

});


// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if(user){
        if(await bcrypt.compare(req.body.password, user.password)){
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
        else {
            res.status(401).send({ msg: 'The password is incorrect'});
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
    
});

// Delete a user
apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Use secureApiRouter
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if(user){
        next();
    }
    else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});


// Buying order
secureApiRouter.post('/buy', async (req, res) => {
    let message = ``;
    let error = false;
    if(req.body.amount < 1){
        message = `Number has to be greater than 0`;
        error = true;
    }
    let existStock = false;
    let currentPrice = -1;
    realStocks.forEach((realStock, index) => {
        if(realStock.symbol === req.body.ticker){
            currentPrice = realStock.price;
        }
    });
    if(currentPrice != -1 && !error){
        await DB.addStock(req.body.email, req.body.ticker, currentPrice, req.body.amount);
        message = `${(pluralize('share', parseInt(req.body.amount), true))} of ${req.body.ticker} bought successfully!`;
    }
    else {
        error = true;
        message = `${req.body.ticker} is not recognized as an official ticker symbol.`;
    }
    res.send({ error: error, message: message });
});

// Selling order
secureApiRouter.post('/sell', async (req, res) => {
    let message = ``;
    let error = false;
    if(req.body.amount < 1){
        message = `Number has to be greater than 0`;
        error = true;
    }
    // Find stock
    const userStock = await DB.getOneStock(req.body.email, req.body.ticker)
    if(userStock){
        if(userStock.amount < req.body.amount){
            message = `You cannot sell more shares of ${req.body.ticker} than you owe. You can sell up to ${userStock.amount} shares of this stock.`;
            error = true;
        }
        else{
            await DB.sellStock(req.body.email, req.body.ticker, req.body.amount);
            message = `${(pluralize('share', parseInt(req.body.amount), true))} of ${req.body.ticker} sold successfully!`;
        }
    }
    else {
        message = `You do not own any stock with the name: ${req.body.ticker}.`;
        error = true;
    }
    res.send({ error: error, message: message });
});

// Display stocks
apiRouter.post('/stocks', async (req, res) => {
    const userStocks = await DB.getUserStocks(req.body.email);
    res.send(userStocks);
});

// Update stock information
apiRouter.get('/load_stocks', (_req, res) => {
    updateStocks();
    res.send(realStocks);
});

// Send current (possibly outdated) stock information.
// Only used to avoid excess API calls
apiRouter.get('/send_stocks', (_req, res) => {
    res.send(realStocks);
});


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken){
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}


function updateStocks(){
    fetch(`https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=${key}`)
        .then((response) => response.json())
        .then((data) => {
            realStocks = data;
        })
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});