import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Welcome from "./components/Welcome";
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AchievementsList from "./components/AchievementsList";

export default function App() {
    const marginTop = {
        marginTop:"20px"
    }

    const heading = "Welcome to Book Shop";
    const quote = "Madry cytat ... "
    const footer = "Mark Twain"

  return (
    <Router>
        <NavigationBar />
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer} />} />/>}/>
                        <Route path="/achievements" exact component={AchievementsList}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

