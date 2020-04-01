import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Welcome from "./components/Welcome";
import Footer from './components/Footer';
import Book from "./components/Book";
import UsersList from "./components/UsersList";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserData from "./components/UserData";
import SingleData from "./components/SingleData";

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
                        <Route path="/add" exact component={Book}/>
                        <Route path="/edit/:userId" exact component={Book}/>
                        <Route path="/userslist" exact component={UsersList}/>
                        <Route path="/usersdata" exact component={UserData}/>
                        <Route path="/singledata/:userId" exact component={SingleData}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

