import React, {Component} from 'react';
import {Link} from "@reach/router";
import PlaceBid from "./PlaceBid";
import Moment from "moment"

class Auction extends Component {
    render() {
        const id = this.props.id;
        const auctionContent = this.props.getAuction(id);
        let innerContent = <p>Loading</p>;
        let list = [];
        if (auctionContent) {
            for(let i = 0;i < auctionContent.bids.length; i++){
            list.push(<li>{auctionContent.bids[i].amount} kr. - {Moment(auctionContent.bids[i].date).format('MMMM Do YYYY, h:mm:ss')}</li>)
            }
            innerContent =
                <>
                    <h1>{auctionContent.title}</h1>
                    <section>{auctionContent.description}</section>

                    <h3>Bids</h3>
                    <ul>
                        {list}
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
