import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CustomerTraining from './CustomerTraining';
import AddCustomer from './AddCustomer';
import { Button } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditCustomer from './EditCustomer';

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

    addCus = (newCus) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCus)
        })
        .then(res => {
            this.loadCustomers();
            //add noti after added cus
            toast.success("New customer added successfully!", {
                position: toast.POSITION.TOP_CENTER
            });
        })
        .catch(err => console.log('addCus Error: ' + err))
    }

    deleteCus = (link) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this customer?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(link, {
                            method: 'DELETE',
                        })
                        .then(res => { 
                            this.loadCustomers();
                            //add noti after deleted
                            toast.success("Delete succeeded!", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                        .catch(err => {
                            console.log('deleteCus Error: ' + err);
                            toast.error("Sorry, there is something wrong when delete customer.", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        })
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    editCus = (link, cus) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cus)
        })
        .then(res => { 
            this.loadCustomers();
            //add noti after deleted
            toast.success("Updated successfully!", {
                position: toast.POSITION.TOP_CENTER
            })
        })
        .catch(err => console.log('editCus Error: ', err))
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
                Header: 'Registered',
                id: 'registered',
                accessor: 'links[2].href',
                filterable: false,
                sortable: false,
                width: 100,
                Cell: ({value}) => <CustomerTraining link={value} />
            },
            {
                id: 'edit',
                accessor: 'links[0].href',
                filterable: false,
                sortable: false,
                width: 50,
                Cell: ({row}) => < EditCustomer editCus={this.editCus} row={row} /> 
            },
            {
                id: 'delete',
                accessor: 'links[0].href',
                filterable: false,
                sortable: false,
                width: 50,
                Cell: ({value}) =>  <Button circular icon='trash' onClick={() => this.deleteCus(value)} />
            }
        ]
        return(
            <div>
                <h3>Customers</h3>
                <AddCustomer addCus={this.addCus} />
                <ReactTable 
                    data={this.state.customers}
                    columns={customerColumns}
                    filterable
                    sortable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <ToastContainer />
            </div>
        );
    }
}

export default CustomerList;