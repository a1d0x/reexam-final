import React, {Component} from "react";

class Login  extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleLogin(){
        console.log("login", this.state.username, this.state.password);
        this.props.login(this.state.username, this.state.password);
    }

    handleChange(event){
        this.setState({
            [event.target.username]: event.target.value
        });
    }

    render(){
        return(
            <>
                <h3>Please Login</h3>
                <input onChange={event => this.handleChange(event)} name="username" type="text" placeholder="username"/>
                <br/>
                <input onChange={event => this.handleChange(event)} name="password" type="password" placeholder="password"/>
                <br/>
                <button onSubmit={_ => this.handleLogin()}>Login</button>
            </>
        );
    }
}

export default Login;