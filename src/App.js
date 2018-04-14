import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import TrainingList from './Components/TrainingList';
import CustomerList from './Components/CustomerList';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {activeItem: ''}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Khanh Dang, 04/2018</h1>
        </header>
        
        <div className="container">
          <BrowserRouter>
            <Grid>
              <Grid.Column width={3}>
                <Menu fluid vertical tabular>
                  <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                  <Menu.Item as={Link} to='/customers' name='Customers' active={activeItem === 'Customers'} onClick={this.handleItemClick} />
                  <Menu.Item as={Link} to='/trainings' name='All Trainings' active={activeItem === 'All Trainings'} onClick={this.handleItemClick} />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={13}>
                <Segment>
                    <Route path='/' component={Home} />
                    <Route path='/customers' component={CustomerList} />
                    <Route path='/trainings' component={TrainingList} />
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
