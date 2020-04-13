import React, { Component } from 'react';
import axios from "axios";
import {Card, Table} from "react-bootstrap";

export default class RealizationList extends Component {

    constructor(props) {
        super(props);
        // this.state = this.initialState;
        this.state = {
            reals: []
        };
    }

    // initialState = {
    //     questid: '',realizationId: '', description: ''
    // }

    componentDidMount() {
        const questId = +this.props.match.params.questId;
        if(questId) {
            this.findRealsByQuestId(questId);
        }
    };

    findRealsByQuestId = (questId) => {
        axios.get('http://localhost:8080/quests/realizations/' + questId)
            .then(response => response.data)
            .then((data) => {
                this.setState({reals: data})
            }).catch(error => {
                console.error('Error - ' + error);
            });
    };

    render() {
        const {description} = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header> Realizations </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.reals.length === 0 ?
                                <tr align='center'>
                                    <td colSpan='6'> No Realizations Available.</td>
                                </tr>
                                :
                                this.state.reals.map((real) => (
                                    <tr key={real.realizationId}>
                                        <td> </td>
                                        <td>{real.description}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }


}
