import React, {Component} from 'react';
import {Link} from "@reach/router";
import PlaceBid from "./PlaceBid";

class Auction extends Component {
    render() {
        const id = this.props.id;
        const auctionContent = this.props.getAuction(id);
        let innerContent = <p>Loading</p>;
        if (auctionContent) {
            innerContent =
                <>
                    <h1>{auctionContent.title}</h1>
                    <section>{auctionContent.description}</section>

                    <h3>Bids</h3>
                    <ul>
                        {auctionContent.bids.map(h => <li key={h}>{h}</li>)}
                    </ul>

                    <Link to="/">Back</Link>
                </>
        }
        return (
            <>
                <p>{innerContent}</p>
                <h3>Place a bid</h3>

                <PlaceBid id={id} placeBid={(id, title) => this.props.placeBid(id, title)}/>
            </>
        );

    }
}

export default Auction;
