import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import { Button, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AddTraining extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            activity: '',
            duration: '',
            customer: ''
        }
        this.handleDate = this.handleDate.bind(this);
    }

    handleDate(date){
        this.setState({
            date
        });
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let {date} = this.state;
        date = date._d;
        const training = {
            date,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.state.customer
        }
        this.props.addTraining(training);
        this.simpleDialog.hide();
    }

    render(){
        return(
            <div>
                <SkyLight
                    hideOnOverlayClicked ref={ref => this.simpleDialog = ref} 
                    title="New Training">
                    <Form>
                        <Form.Field>
                        <label>Activity</label>
                        <input 
                            placeholder='Activity'
                            name='activity'
                            value={this.state.activity} 
                            onChange={this.handleInput}/>
                        </Form.Field>

                        <Form.Field>
                        <label>Duration</label>
                        <input 
                            placeholder='Duration'       
                            name='duration'
                            value={this.state.duration}
                            onChange={this.handleInput}
                            />
                        </Form.Field>

                        <Form.Field>
                        <label>Date</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDate}
                         />
                        </Form.Field>

                         <Form.Field>
                            <label>Customer URL</label>
                            <input 
                                placeholder='e.g. https://customerrest.herokuapp.com/api/customers/1'
                                name='customer'
                                value={this.state.customer}
                                onChange={this.handleInput}
                                />
                        </Form.Field>
                    <Button
                        color='green'  
                        type='submit'
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                    </Form>
                </SkyLight>

                <Button 
                    color='green' 
                    animated onClick={() => this.simpleDialog.show()}>
                    <Button.Content visible>Add New</Button.Content>
                    <Button.Content hidden>
                        Training
                    </Button.Content>
                </Button>
            </div>
        );
    }
}

export default AddTraining;