import React, { Component } from 'react';
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

export default class Realization extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.state.show = false;
        this.realizationChange = this.realizationChange.bind(this);
        this.submitRealization = this.submitRealization.bind(this);
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

    resetRealization = () => {
        this.setState(() => this.initialState);
    };

    submitRealization = event => {
        event.preventDefault();

        const realization = {
            description: this.state.description
        };

//      TODO: HARDCODE USER ID AND QUEST ID !!! CHANGE IT!
        axios.post('http://localhost:8080/realizations/user2/quest2', realization)
            .then(response => {
                if(response.data != null) {
                    this.setState({'show':true, 'method':'post'});
                    setTimeout(() => this.setState({'show':false}), 3000);
                } else {
                    this.setState({'show':false});
                }
            });

        this.setState(this.initialState);
    };

    realizationChange= event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

//  TODO: ADD HISTORY BACK
    achievementBack = () => {
        return this.props.history.push('/achievement/:achievementId')
    }

    render() {
        const {description} = this.state;

        return (
            <div>
                <div style={{'display':this.state.show ? 'block' : 'none'}}>
                    <MyToast show={this.state.show} message = {this.state.method === 'put' ? 'Realization Updated Successfully' : 'Realization Saved Successfully'} type={'success'}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faEdit}/>Add Realization</Card.Header>
                    <Form onReset={this.resetRealization} onSubmit={this.submitRealization} id='realizationFormId'>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId='formGrindDescription'>
                                    <Form.Label> Description </Form.Label>
                                    <Form.Control required autoComplete='off'
                                                 type="text" name='description'
                                                 value={description} onChange={this.realizationChange}
                                                 className={'bg-dark text-white'}
                                                 placeholder='How did you accomplish the task?'/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.userId ? "Update" : "Save"}
                            </Button>{" "}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{" "}
                            <Button size="sm" variant="info" type="button" onClick= {this.achievementBack.bind()}>
                                <FontAwesomeIcon icon={faList} /> Back
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}


