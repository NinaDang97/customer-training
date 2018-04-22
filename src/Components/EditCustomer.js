import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import { Button, Form } from 'semantic-ui-react';

class EditCustomer extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: this.props.row.firstname,
            lastname: this.props.row.lastname,
            streetaddress: this.props.row.streetaddress,
            postcode: this.props.row.postcode,
            city: this.props.row.city,
            email: this.props.row.email,
            phone: this.props.row.phone
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    } 

    submitBtn = (event) => {
        event.preventDefault();

        const editCus = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.editCus(this.props.row.edit, editCus);
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
                    title="Edit Customer">
                    <Form>
                        <Form.Field>
                            <label>First Name</label>
                            <input 
                            placeholder='First name'
                            name='firstname' value={this.state.firstname} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input
                            placeholder='Last name'
                            name='lastname' value={this.state.lastname} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Street address</label>
                            <input
                            placeholder='Street address'
                            name='streetaddress' value={this.state.streetaddress} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Postcode</label>
                            <input
                            placeholder='Postcode'
                            name='postcode' value={this.state.postcode} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>City</label>
                            <input
                            placeholder='City'
                            name='city' value={this.state.city} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                            placeholder='Email'
                            name='email' value={this.state.email} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone</label>
                            <input name='phone'
                            placeholder='Phone number'
                            value={this.state.phone} onChange={this.handleChange} />
                        </Form.Field>
                        <Button
                            color='facebook' 
                            onClick={this.submitBtn}>
                            Submit Changes
                        </Button>
                    </Form>
                </SkyLight>

                <Button circular icon='write' onClick={() => this.simpleDialog.show()} />
            </div>
        );
    }
}

export default EditCustomer;