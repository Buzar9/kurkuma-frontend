import React, { Component } from 'react';
import axios from "axios";
import {Card, Form, Button, Col, Table} from "react-bootstrap";

export default class Achievement extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.state.show = false;
        // this.achChange = this.achChange.bind(this);
        // this.openAch = this.openAch.bind(this);
    }

    initialState = {
        achievementId: "", title: ""
    };

    componentDidMount() {
        const achievementId = +this.props.match.params.achievementId;
        if(achievementId) {
            this.findAchievementById(achievementId)
        }
    }

    findAchievementById = (achievementId) => {
        axios.get('http://localhost:8080/achievements/' + achievementId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        achievementId: response.data.achievementId,
                        title: response.data.title,
                        if(questList) {
                            // questList: response.data.questList
                        }
                    });
                }
            }).catch((error) => {
                console.error('Error - ' + error)
        });
    };

    render() {
        const {achievementId, title} = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>{title}</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Job</th>
                                </tr>
                            </thead>
                            {/*<tbody>*/}
                            {/*{this.state.questList.length === 0 ?*/}
                            {/*    <tr align='center'>*/}
                            {/*        <td colSpan='6'> No Quest Available </td>*/}
                            {/*    </tr>*/}
                            {/*:*/}
                            {/*this.state.questList.map((quest) => (*/}
                            {/*    <tr key={quest.questId}>*/}
                            {/*        <td>{quest.description}</td>*/}
                            {/*        <td>{quest.job}</td>*/}

                            {/*    </tr>*/}
                            {/*))*/}
                            {/*}*/}
                            {/*</tbody>*/}
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}