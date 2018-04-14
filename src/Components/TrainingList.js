import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TrainingList extends Component{
    constructor(props){
        super(props);
        this.state = {
            trainings: []
        }
    }

    componentDidMount(){  
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => this.setState({
            trainings: data.content
        }))
        .catch(err => console.log("loadTrainings Error: " + err))
    }

    render(){
        const trainingColumns = [
            {
                Header: 'Id',
                accessor: 'links[0].href',
                show: false
            },
            {
                Header: 'Date',
                accessor: 'date'
            },
            {
                Header: 'Duration',
                accessor: 'duration'
            },
            {
                Header: 'Activity',
                accessor: 'activity'
            },
            
        ];

        return(
            <div>
                <h3>All Trainings</h3>
                <ReactTable 
                    data={this.state.trainings}
                    columns={trainingColumns}
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default TrainingList;