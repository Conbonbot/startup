const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { 
    tls: true, 
    serverSelectionTimeoutMS: 3000, 
    autoSelectFamily: false, 
});
const db = client.db('startup');
const userCollection = db.collection('user');
const stockCollection = db.collection('stock');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function getUser(email){
    return userCollection.findOne({ email: email });
}

function getUserByToken(token){
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
}

async function addStock(email, ticker, price, amount){
    const userStock = await stockCollection.findOne({ email: email, ticker: ticker})
    if(userStock){
        const newAmount = parseInt(userStock.amount) + parseInt(amount);
        return stockCollection.updateOne(
            { _id : userStock._id},
            { $set: { amount: newAmount} }
        );
    }
    const date = new Date().toLocaleDateString();
    const stock = {
        email: email,
        ticker: ticker,
        amount: amount,
        price: price,
        date: date,
    };
    return stockCollection.insertOne(stock);
}

// Assumes the user already holds this stock
async function sellStock(email, ticker, sellingAmount){
    const oldStock = await stockCollection.findOne({ email: email, ticker: ticker})
    if(oldStock.amount > sellingAmount){
        const newAmount = parseInt(oldStock.amount) - parseInt(sellingAmount);
        const date = new Date().toLocaleDateString();
        return stockCollection.updateOne(
            { _id: oldStock._id },
            { $set: { amount: newAmount, date: date} }
        );
    }
    return stockCollection.deleteOne({email: email, ticker: ticker});
}

async function getUserStocks(email){
    const query = {email: email};
    const options = {
        sort: { price: -1}
    };
    const cursor = stockCollection.find(query, options);
    return cursor.toArray();
}

async function getOneStock(email, ticker){
    const query = { email: email, ticker: ticker};
    return stockCollection.findOne(query);
}


module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addStock,
    sellStock,
    getUserStocks,
    getOneStock,
};