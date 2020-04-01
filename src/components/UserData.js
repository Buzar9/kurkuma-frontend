import React, {Component} from 'react';
import {ButtonGroup, Button, Card, Image, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

export default class UserData extends Component {

    constructor (props){
        super(props);
        this.state = {
            usersData : []
        };
    }

    componentDidMount() {
        this.findAllBooks();
    }

    findAllBooks(){
        axios.get("http://localhost:8080/users/data")
            .then(response => response.data)
            .then((data) => {
                this.setState({usersData: data})
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
                    <Card.Header><FontAwesomeIcon icon={faList}/> Book List</Card.Header>
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
                                    <td colSpan="6"> Books Available.</td>
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

