import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../Firebase';
import * as routes from '../Constants/routes';

const LogInPage = ({ history }) => 
    <div>
        <h1>LogIn Page</h1>
        <SignUpLink />
        <LogInForm history={history} />
    </div>

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class LogInForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
    }
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            email,
            password,
        } = this.state;

        const { history } = this.props;

        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState(() => ({...INITIAL_STATE}));
            history.push(routes.HOME);
        })
        .catch(error => this.setState({error}))
    }

    render(){
        const isInvalid = 
            this.state.email === '' ||
            this.state.password === '';

        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email Address" />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />

                <button disabled={isInvalid}>Sign In</button>

                {this.state.error && <h3>{this.state.error.message}</h3>}
            </form>
        );
    }
}

export default withRouter(LogInPage);

export { LogInForm };