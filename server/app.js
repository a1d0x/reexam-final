/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Some test data ****/
const auctions = [
    {
        id: 0,
        auction: "Refurbished GTX 1660ti",
        description: "It's a good graphics card",
        bids: ["800kr", "850kr"]
    },
    {
        id: 1,
        auction: "Old African Mask",
        description: "A mask taken home from a holiday",
        bids: ["250kr"]
    },
];

/**** Routes ****/
app.get('/api/auctions', (req, res) => {
    Auction.find({}, (error, auctions) => {
        res.json(auctions)})
});

app.post('/api/auctions/:id/bids', (req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    const auction = auctions.find(a => a.id === id);
    auction.bids.push(text);
    console.log(auction);
    res.json({msg: "Bid placed", auction: auction});
});

app.post('/api/auctions/newauction', (req, res) => {
    const text = req.body.text;
    let auction = new Auction({title: text, description: text, bids:[]});
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
        username: String,
        amount: Number,
        date: Date
    }]
});
Auction = mongoose.model('auction', auctionSchema)

/**** Connection ****/
//app.listen(port, () => console.log(`${appName} API running on port ${port}!`));

const dbUrl = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async() => {
        await app.listen(port);
        console.log("Database connected:", mongoose.connection.name)
    }).catch(error => console.error(error));
