import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import { Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class CustomerTraining extends Component{
    constructor(props){
        super(props);
        this.state = {
            trainings: [],
            totalTraining: 0,
            dates: []
        }
    }

    componentDidMount(){
        fetch(this.props.link, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            data = data.content;
            for(let i = 0; i < data.length; i++){
                let trainingObj = {}

                if(data[i].activity === undefined){
                    trainingObj = {};
                } else{
                    let date = new Date(data[i].date).toJSON().substr(0, 10);
                    trainingObj = {
                        ...data[i],                        
                        date
                    }
                    this.setState({
                        totalTraining: data.length,
                        dates: [...this.state.dates, moment(date)]
                    });
                }
                
                let trainings = [...this.state.trainings, trainingObj];
                this.setState({trainings});
            }    
        })
        .catch(err => console.log('Error fetching in CustomerTraining.js: ' + console.log(err)));
    }

    render(){
        const skylightStyle = {
            width: '50%',
            marginTop: '-300px',
        };

        const training = this.state.trainings.map((val, i) => (
            <li key={i} style={{textAlign: 'left'}}>
                <strong>{val.activity}</strong> <br />
                Date: {val.date} <br />
                Duration: {val.duration}
            </li>
        ));
        return(
            <div>
                <SkyLight 
                    dialogStyles={skylightStyle}
                    hideOnOverlayClicked ref={ref => this.simpleDialog = ref} 
                    title="Registered Training Program">
                    <ol>
                        {training}
                    </ol>
                    
                    <h3>Your training calendar</h3>
                    <DatePicker 
                        inline
                        highlightDates={this.state.dates}
                    />
                </SkyLight>

                {/* <button onClick={() => this.simpleDialog.show()}>Details</button> */}
                <Button 
                    inverted color='facebook'
                    onClick={() => this.simpleDialog.show()}
                >
                    {this.state.totalTraining}
                </Button>
            </div>
        );
    }
}

export default CustomerTraining;