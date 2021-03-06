import React, {Component} from 'react';
import {Router} from "@reach/router";
import Auctions from "./Auctions";
import Auction from "./Auction";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            auctions: []
        };
    }

    componentDidMount() {
        this.getAuctions().then(() => console.log("Auction created"));
    }

    async getAuctions() {
        let url = `${this.API_URL}/auctions`;
        let result = await fetch(url);
        let auction = await result.json();
        return this.setState({
            auctions: auction
        })
    }

    getAuction(id) {
        const auction = this.state.auctions.find(a => a._id === id);
        return auction;
    }

    async placeBid(id, text) {
        console.log("placeBid", id, text);

        const url = `http://localhost:8080/api/auctions/${id}/bids`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);

        this.getAuctions();
    }

    async addAuction(text) {
        console.log("addAuction", text);
        const url = `http://localhost:8080/api/auctions/newauction`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getAuctions();
    }

    render() {
        return (
            <>
                <h1>Auction House</h1>
                <Router>
                    <Auctions path="/" data={this.state.auctions}
                               addAuction={(text) => this.addAuction(text)}
                    ></Auctions>
                    <Auction path="/Auction/:id"
                              getAuction={id => this.getAuction(id)}
                              placeBid={(id, text) => this.placeBid(id, text)}
                    ></Auction>
                </Router>
            </>
        );
    }
}

export default App;
