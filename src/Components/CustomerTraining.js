import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class CustomerTraining extends Component{
    constructor(props){
        super(props);
        this.state = {
            trainings: []
        }
    }

    componentDidMount(){
        fetch(this.props.link, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => this.setState({
            trainings: data.content
        }))
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
                    {/* <button onClick={()=>console.log(this.props.link)}>Show</button> */}
                    {/* {this.props.link} */}
                    <ol>
                        {training}
                    </ol>
                </SkyLight>

                <button onClick={() => this.simpleDialog.show()}>Details</button>
            </div>
        );
    }
}

export default CustomerTraining;