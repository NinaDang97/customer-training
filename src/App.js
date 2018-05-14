import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './Components/Landing';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import TrainingList from './Components/TrainingList';
import CustomerList from './Components/CustomerList';
import SignOutBtn from './Components/SignOut';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import * as routes from './Constants/routes';
import { firebase } from './Firebase';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'Landing',
      authUser: null
    }
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null })
    })
  }

  render() {
    const { activeItem } = this.state;

    const Navigation = ({ authUser }) => 
      <div>
        {
          authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
        }
      </div>

    const NavigationAuth = () => 
        <div>
          <Menu.Item as={Link} to={routes.HOME} name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to={routes.CUSTOMERS} name='Customers' active={activeItem === 'Customers'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to={routes.TRAININGS} name='All Trainings' active={activeItem === 'All Trainings'} onClick={this.handleItemClick} />
          <SignOutBtn  />
        </div>

    const NavigationNonAuth = () =>
        <div>
          <Menu.Item as={Link} to={routes.LANDING} name="Landing" active={activeItem === 'Landing'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to={routes.LOG_IN} name="Login" active={activeItem === 'Login'} onClick={this.handleItemClick} />
        </div>

    const Content = ({ authUser }) => 
        <div>
          {
            authUser
            ? <ContentAuth />
            : <ContentNonAuth />
          }
        </div>

    const ContentAuth = () => 
        <div>
          <Route exact path={routes.HOME} component={() => <Home />} />
          <Route exact path={routes.CUSTOMERS} component={() => <CustomerList />} />
          <Route exact path={routes.TRAININGS} component={() => <TrainingList />} />
        </div>

    const ContentNonAuth = () => 
        <div>          
          <Route exact path={routes.LANDING} component={() => <Landing />} />
          <Route exact path={routes.LOG_IN} component={() => <LogIn />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUp />} />
        </div>     

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Khanh Dang, 04/2018</h1>
        </header>
        
        <div className="container">
          <BrowserRouter>
            <Grid>
              <Grid.Column width={2}>
                <Menu fluid vertical tabular>
                  <Navigation authUser={this.state.authUser} />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={14}>
                <Segment>
                  <Content authUser={this.state.authUser} />
                </Segment>
              </Grid.Column>
            </Grid>
          </BrowserRouter>
        </div>        
      </div>
    );
  }
}

export default App;
