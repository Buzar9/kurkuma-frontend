import React, { Component } from 'react';
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class Realization extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.submitRealization = this.submitRealization.bind(this)
    }

    initialState = {
        realizationId: '', questId: '', userId: '', description: ''
    };

    componentDidMount() {
        const realizationId = +this.props.match.params.realizationId;
        if (realizationId) {
            this.findRealizationById(realizationId)
        }
    }

    findRealizationById = (realizationId) => {
        axios.get('http://localhost:8080/realizations/' + realizationId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        realizationId: response.data.realizationId,
                        questId: response.data.questId,
                        userId: response.data.userId,
                        description: response.data.description
                    });
                }
            }).catch((error) => {
            console.error('Error - ' + error);
        });
    };

    submitRealization = event => {
        event.preventDefault();

        const realization = {
            description: this.state.description
        };

//      TODO: HARDCODE USER ID AND QUEST ID !!! CHANGE IT!
        axios.post('http://localhost:8080/realizations/user2/quest2', realization);
        this.setState(this.initialState);
    };

    realizationChange= event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        // const {description} = this.state;

        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faEdit}/>Add Realization</Card.Header>
                <Form onSubmit={this.submitRealization} id='realizationFormId'>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId='formGrindDescription'>
                                <Form.Label> Description </Form.Label>
                                <Form.Control required autoComplete='on'
                                             type="text" name='description'
                                             value={this.state.description} onChange={this.realizationChange}
                                             className={'bg-dark text-white'}
                                             placeholder='How did you accomplish the task?'/>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave}/> {this.state.userId ? "Update" : "Save"}
                        </Button>{" "}
                        {/*<Button size="sm" variant="info" type="reset">*/}
                        {/*    <FontAwesomeIcon icon={faUndo}/> Reset*/}
                        {/*</Button>{" "}*/}
                        {/*<Button size="sm" variant="info" type="button" onClick= {this.bookList.bind()}>*/}
                        {/*    <FontAwesomeIcon icon={faList} /> Book List*/}
                        {/*</Button>*/}
                    </Card.Footer>
                </Form>
            </Card>
        )
    }
}


