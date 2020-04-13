import React, { Component } from 'react';
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import axios from 'axios';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBahai, faCheck, faCodeBranch, faCrown, faFireAlt, faHourglassHalf, faList, faStarOfLife} from "@fortawesome/free-solid-svg-icons";

export default class AchievementsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            achs: []
        };
    }

    componentDidMount() {
        this.findAllAchievements();
    }

    findAllAchievements() {
        axios.get("http://localhost:8080/achievements")
            .then(response => response.data)
            .then((data) => {
                this.setState({achs: data})
            });
    };

    render() {

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Achievements {'   '}
                        <ButtonGroup>
                            <Button size='sm'><FontAwesomeIcon icon={faList}/></Button>
                            <Button size= 'sm'><FontAwesomeIcon icon={faCodeBranch}/></Button>
                        </ButtonGroup>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>Level</th>
                                    <th>Title</th>
                                    <th>Done/ At Work</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.achs.length === 0 ?
                                <tr align="center">
                                    <td colsSpan = '6'> No Achievements Available. </td>
                                </tr>
                            :
                            this.state.achs.map((ach) => (
                                <tr key={ach.achievementId}>
                                    <td>{ach.level}<FontAwesomeIcon icon={faStarOfLife}/></td>
                                    <td>
                                        <Link to={'achievement/' + ach.achievementId}>{ach.title}</Link>
                                    </td>
                                    <td>
                                        <Button size='sm'><FontAwesomeIcon icon={faFireAlt}/></Button> /
                                        <FontAwesomeIcon icon={faHourglassHalf}/> / 
                                        <FontAwesomeIcon icon={faCrown}/>
                                         + Progress Bar
                                    </td>
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
