import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import { Button } from 'semantic-ui-react';

class CustomerTraining extends Component{
    constructor(props){
        super(props);
        this.state = {
            trainings: [],
            totalTraining: 0
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
                    let date = new Date(data[i].date);
                    date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                    trainingObj = {                        
                        date: date,
                        duration: data[i].duration,
                        activity: data[i].activity
                    }
                    this.setState({
                        totalTraining: data.length
                    });
                }
                
                let trainings = [...this.state.trainings, trainingObj];
                this.setState({trainings});
            }    
        })
        .catch(err => console.log('Error fetching in CustomerTraining.js: ' + console.log(err)));
    }

    render(){
        const training = this.state.trainings.map((val, i) => (
            <li key={i} style={{textAlign: 'left'}}>
                <strong>{val.activity}</strong> <br />
                Date: {val.date} <br />
                Duration: {val.duration}
            </li>
        ));
        return(
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Registered Training Program">
                    <ol>
                        {training}
                    </ol>
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