import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import { Button, Form } from 'semantic-ui-react';

class AddCustomer extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    } 

    submitBtn = (event) => {
        event.preventDefault();

        const newCus = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.addCus(newCus);
        this.simpleDialog.hide();
    }

    render(){
        const addCusForm = {
            textAlign: 'left',
            width: '50%',
            marginTop: '-350px',
        };
        return(
            <div>
                <SkyLight 
                    dialogStyles={addCusForm}
                    hideOnOverlayClicked ref={ref => this.simpleDialog = ref} 
                    title="New Customer">
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input name='firstname' value={this.state.firstname} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input name='lastname' value={this.state.lastname} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Street address</label>
                            <input name='streetaddress' value={this.state.streetaddress} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Postcode</label>
                            <input name='postcode' value={this.state.postcode} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>City</label>
                            <input name='city' value={this.state.city} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input name='email' value={this.state.email} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone</label>
                            <input name='phone' value={this.state.phone} onChange={this.handleChange} />
                        </Form.Field>
                        <Button onClick={this.submitBtn}>
                            Submit
                        </Button>
                    </Form>
                </SkyLight>

                <Button 
                    color='facebook' 
                    animated onClick={() => this.simpleDialog.show()}>
                    <Button.Content visible>Add New</Button.Content>
                    <Button.Content hidden>
                        Customer
                    </Button.Content>
                </Button>
            </div>
        );
    }
}

export default AddCustomer;