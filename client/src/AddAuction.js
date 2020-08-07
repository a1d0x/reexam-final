import React,{Component} from 'react';

class AddAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctions: ""
        };


    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.addAuction(this.state.auctions);
    }
    render() {
        return (
            <>
                <input name="auctions" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Add auction</button>
            </>
        );
    }
}

export default AddAuction;