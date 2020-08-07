/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

/**** Configuration ****/
const appName = "Express API Template";
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());
app.use(express.static('../client/build'));

/**** Users****/
const users = [
    {
        id: 0,
        role: "admin",
        username: "jesperheller",
        password: "adminsRcool"
    },
    {
        id: 1,
        role: "user",
        username: "aidox",
        password: "pw1234"
    },
    {
        id: 2,
        role: "user",
        username: "gajzii",
        password: "ollinator"
    },
];

/**** Routes ****/
app.get('/api/auctions', (req, res) => {
    Auction.find({}, (error, auctions) => {
        res.json(auctions)})
});

app.post('/api/auctions/:id/bids', async (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    let highestBid = parseInt(text);
    const auction = await Auction.findById(id)
    if(auction.bids[auction.bids.length-1].amount > highestBid){
        res.json({most: "no"})
    }
    else{
        auction.bids.push({amount: text, date: Date.now()});
        auction.save();
        console.log(auction);
        res.json({msg: "Bid placed", auction: auction});
    }
});
//test test
app.post('/api/auctions/newauction', (req, res) => {
    const text = req.body.text;
    let auction = new Auction({title: text, description: text, bids:[{amount:0, date: Date.now()}]});
    auction.save();
   // auctions.push(auction);

    res.json({msg: "Auction added", auction: auction})

});

/**** Schemas ****/
let Auction;
const auctionSchema = new mongoose.Schema({
    title: String,
    description: String,
    bids: [{
        amount: Number,
        date: Date
    }]
});
Auction = mongoose.model('auction', auctionSchema)

/**** Connection ****/
//app.listen(port, () => console.log(`${appName} API running on port ${port}!`));

app.get('*', (req, res) =>
    res.sendFile(path.resolve('..','client','build','index.html'))
);

const dbUrl = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async() => {
        await app.listen(port);
        console.log("Database connected:", mongoose.connection.name)
    }).catch(error => console.error(error));
