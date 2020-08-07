import React, {Component} from 'react';
import {Link} from "@reach/router";
import PlaceBid from "./PlaceBid";
import AddAuction from "./AddAuction";

class Auctions extends Component {
    render() {
        const list = this.props.data.map(a =>
            <li><Link to ={"/Auction/"+a._id}>{a.title} </Link> {a.bids[a.bids.length-1].amount}</li>);

        return (
            <>
            <ul>
                {list}
            </ul>

            <AddAuction addAuction={title => this.props.addAuction(title)}/>
            </>
        );
    }
}

export default Auctions;