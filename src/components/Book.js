import React, { Component } from 'react';
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";
import axios from 'axios';

export default class Book extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.state.show = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {
        userId: "", username: "", password: "", enabled: "", roles: ""
    };

    componentDidMount() {
        const userId = +this.props.match.params.userId;
        if(userId) {
            this.findBookById(userId)
        }
    }

    findBookById = (userId) => {
        axios.get("http://localhost:8080/users/" + userId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        userId: response.data.userId,
                        username: response.data.username,
                        password: response.data.password,
                        enabled: response.data.enabled,
                        roles: response.data.roles
                    });
                }

            }).catch((error) => {
            console.error("Error - " + error);
        });
    }

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    submitBook = event => {
        event.preventDefault();

        const book = {
            username: this.state.username,
            password: this.state.password,
            enabled: this.state.enabled,
            roles: this.state.roles
        };

        axios.post("http://localhost:8080/users", book)
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

    updateBook = event => {
        event.preventDefault();

        const user = {
            userId: this.state.userId,
            username: this.state.username,
            password: this.state.password,
            enabled: this.state.enabled,
            roles: this.state.roles
        };

        axios.put("http://localhost:8080/users/" + user.userId, user)
            .then(response => {
                if(response.data != null) {
                    this.setState({'show':true, 'method':'put'});
                    setTimeout(() => this.setState({'show':false}), 3000);
                    setTimeout(() => this.bookList(), 2000);
                } else {
                    this.setState({'show':false});
                }
            });

        this.setState(this.initialState);
    };

    bookChange= event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    bookList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {username, password, enabled, roles} = this.state;

        return (
            <div>
                <div style={{'display':this.state.show ? 'block' : 'none'}}>
                    <MyToast show = {this.state.show} message = {this.state.method === 'put' ? 'User Updated Successfully' : 'User Saved Successfully.'} type = {'success'}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.userId ? faEdit : faPlusSquare}/> {this.state.userId ? "Update" : "Add New"} User</Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.state.userId ? this.updateBook : this.submitBook} id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="username"
                                                  value={username} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Username" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="password"
                                                  value={password} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Password" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEnabled">
                                    <Form.Label>Enabled</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="enabled"
                                                  value={enabled} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Is Enabled?" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridRoles">
                                    <Form.Label>Roles</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="roles"
                                                  value={roles} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Roles" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.userId ? "Update" : "Save"}
                            </Button>{" "}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{" "}
                            <Button size="sm" variant="info" type="button" onClick= {this.bookList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Book List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>



        );
    }


}
