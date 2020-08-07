/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

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

// Return all recipes in data
app.get('/api/auctions', (req, res) => res.json(auctions));

// PostAnswer
app.post('/api/auctions/:id/bids', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const auction = auctions.find(a => a.id === id);
    auction.bids.push(text);
    console.log(auction);
    res.json({msg: "Bid placed", auction: auction});
});

app.post('/api/auctions/newauction', (req, res) => {
    const text = req.body.text;
    let auction = {id:auctions.length+1,auction:text,bids:[]};
    auctions.push(auction);

    res.json({msg: "Auction added", auction: auction})

})

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
