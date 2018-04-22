import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddTraining from './AddTraining';
import { Button } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        .then(data => {
            data = data.content;
            let trainings = [];
            for(let i = 0; i < data.length; i++){
                let date = new Date(data[i].date).toJSON().substr(0, 10);
                let trainingObj = {
                    ...data[i],
                    date
                }
                trainings.push(trainingObj);
                this.setState({trainings});
            }          
        })
        .catch(err => console.log("loadTrainings Error: " + err))
    }

    addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(res => this.loadTrainings())
        .catch(err => console.log("addTraining Error: " + err))
    }

    deleteTraining = (deletedLink) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this training program?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(deletedLink, {
                            method: 'DELETE',
                        })
                        .then(res => {
                            this.loadTrainings();
                            //add noti after deleted
                            toast.success("Delete succeeded!", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                        .catch(err => console.log('deleteTraining Error: ' + err))
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
        
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
            {
                id: 'button',
                accessor: 'links[0].href',
                filterable: false,
                sortable: false,
                width: 50,
                Cell: ({value}) => (<Button circular icon='trash' onClick={()=> this.deleteTraining(value)} />)
            }
            
        ];

        return(
            <div>
                <h3>All Trainings</h3>
                <AddTraining addTraining={this.addTraining} />
                <ReactTable 
                    data={this.state.trainings}
                    columns={trainingColumns}
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <ToastContainer />
            </div>
        );
    }
}

export default TrainingList;