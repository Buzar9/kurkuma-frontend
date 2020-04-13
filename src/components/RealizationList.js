import React, { Component } from 'react';
import axios from "axios";
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFile, faTrash} from "@fortawesome/free-solid-svg-icons";

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

    deleteRealization = (realizationId) => {
        axios.delete('http://localhost:8080/realizations/' + realizationId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        reals: this.state.reals.filter(realization => realization.realizationId !== realizationId)
                    })
                }
            })
    }

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
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteRealization.bind(this, real.realizationId)}><FontAwesomeIcon icon={faTrash}/></Button>
                                                <Button size='sm'><FontAwesomeIcon icon={faEdit}/></Button>
                                            </ButtonGroup>
                                        </td>
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
