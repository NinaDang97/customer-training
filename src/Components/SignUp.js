import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../Constants/routes';
import { auth } from '../Firebase';

const SignUpPage = ({ history }) => 
    <div>
        <h1>SignupPage</h1>
        <SignUpForm history={history} />
    </div>

const SignUpLink = () => 
    <p>
        Don't have an account? Please
        <Link to={routes.SIGN_UP}> Sign Up</Link>
    </p>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class SignUpForm extends Component {
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const { history } = this.props;

        auth.createUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            this.setState(() => ({...INITIAL_STATE}));
            history.push(routes.HOME);
        })
        .catch(error => {
            this.setState({error});
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const isInvalid = 
            this.state.passwordOne !== this.state.passwordTwo ||
            this.state.passwordOne === '' ||
            this.state.email === '' ||
            this.state.username === '';
        
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email Address" />
                <input type="password" name="passwordOne" value={this.state.passwordOne} onChange={this.handleChange} placeholder="Password" />
                <input type="password" name="passwordTwo" value={this.state.passwordTwo} onChange={this.handleChange} placeholder="Confirm Password" />

                <button disabled={isInvalid}>Sign Up</button>

                {this.state.error && <h3>{this.state.error.message}</h3>}
            </form>        
        );
    }
}

export default withRouter(SignUpPage);

export { SignUpPage, SignUpLink };