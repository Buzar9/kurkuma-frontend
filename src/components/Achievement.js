import React, { Component } from 'react';
import axios from "axios";
import {Card, Form, Button, Col, Table, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faEye, faFile, faFireAlt, faHourglassHalf, faPen, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class Achievement extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState;
        this.state.show = false;
        // this.achChange = this.achChange.bind(this);
        // this.openAch = this.openAch.bind(this);
    }

    initialState = {
        achievementId: "", title: "", questList: []
    };

    componentDidMount() {
        const achievementId = +this.props.match.params.achievementId;
        if(achievementId) {
            this.findAchievementById(achievementId)
        }
    };

    findAchievementById = (achievementId) => {
        axios.get('http://localhost:8080/achievements/' + achievementId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        achievementId: response.data.achievementId,
                        title: response.data.title,
                        questList: response.data.questList
                    });
                }
            }).catch((error) => {
                console.error('Error - ' + error)
        });
    };

    render() {
        const {title} = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>{title}{' '}
                    <Link className='btn btn-sm btn-outline-primary'><FontAwesomeIcon icon={faFireAlt}/></Link>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>Rozwijany zachęcacz z książeczki sprawności, wystarczy go tu wstrzyknąć.
                        </Card.Text>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>Approved?</th>
                                    <th>Description</th>
                                    <th>Job</th>
                                    <th>Realization</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.questList.length === 0 ?
                                <tr align='center'>
                                    <td colSpan='6'> No Quest Available </td>
                                </tr>
                            :
                            this.state.questList.map((quest) => (
                                <tr key={quest.questId}>
                                    <td><FontAwesomeIcon icon={faCheck}/> / <FontAwesomeIcon icon={faTimes}/> / <FontAwesomeIcon icon={faHourglassHalf}/></td>
                                    <td>{quest.description}</td>
                                    <td>{quest.job}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"/realization"} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faPlus}/>{' '}</Link>
                                            <Link to={'/realizationList/' + quest.questId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEye}/></Link>
                                        </ButtonGroup>
                                    </td>

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