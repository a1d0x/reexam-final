import React, {Component} from 'react';

class PlaceBid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.placeBid(this.props.id, this.state.input);
    }

    render() {
        return (
            <>
                <input name="input" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Place Bid</button>
            </>
        )
    }
}

export default PlaceBid;

