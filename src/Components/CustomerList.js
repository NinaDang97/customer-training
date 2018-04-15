import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CustomerTraining from './CustomerTraining';

class CustomerList extends Component{
    constructor(props){
        super(props);
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => this.setState({
            customers: data.content
        }))
        .catch(err => console.log("loadCustomers Error: " + console.log(err)))
    }

    render(){
        const customerColumns = [
            {
                Header: 'Id',
                accessor: 'links[0].href',
                show: false
            },
            {
                Header: 'Firstname',
                accessor: 'firstname'
            },
            {
                Header: 'Lastname',
                accessor: 'lastname'
            },
            {
                Header: 'Street address',
                accessor: 'streetaddress'
            },
            {
                Header: 'Postcode',
                accessor: 'postcode'
            },
            {
                Header: 'City',
                accessor: 'city'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
            },
            {
                Header: 'Program',
                id: 'button',
                accessor: 'links[2].href',
                filterable: false,
                sortable: false,
                width: 100,
                Cell: ({value}) => <CustomerTraining link={value} />
            }
        ]
        return(
            <div>
                <h3>Customers</h3>
                <ReactTable 
                    data={this.state.customers}
                    columns={customerColumns}
                    filterable
                    sortable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default CustomerList;