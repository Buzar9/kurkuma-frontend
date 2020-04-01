import React, {Component} from 'react';
import {ButtonGroup, Button, Card, Image, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

export default class SingleData extends Component {

    constructor (props){
        super(props);
        this.state = {
            usersData : []
        };
    }

    componentDidMount() {
        const userId = +this.props.match.params.userId;
        if(userId) {
            this.findUserById(userId)
        }
    }

    findUserById = (userId) => {
        axios.get("http://localhost:8080/users/" + userId + "/data")
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        userId: response.data.userId,
                        username: response.data.username,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        patrolName: response.data.patrolName
                    });
                }

            }).catch((error) => {
            console.error("Error - " + error);
        });
    };

    // deleteUser = (userId) => {
    //     axios.delete("http://localhost:8080/users/" + userId)
    //         .then(response => {
    //             if(response.data != null) {
    //                 this.setState({'show':true});
    //                 setTimeout(() => this.setState({'show':false}), 3000);
    //
    //                 this.setState({
    //                     users: this.state.users.filter(user => user.userId !== userId)
    //                 })
    //             } else {
    //                 this.setState({'shoe':false});
    //             }
    //         });
    // };

    render() {
        return (
            <div>
                {/*<div style={{'display':this.state.show ? 'block' : 'none'}}>*/}
                {/*    <MyToast show = {this.state.show} message = {'User Deleted Successfully.'} type = {'danger'}/>*/}
                {/*</div>*/}
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> User Data</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Patrol</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.usersData.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"> No Data Available.</td>
                                </tr>
                                :
                                this.state.usersData.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.username}</td>
                                        <td>{user.firstName}{' '}{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.patrolName}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

