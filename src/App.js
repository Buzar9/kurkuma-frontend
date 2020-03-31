import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Welcome from "./components/Welcome";
import Footer from './components/Footer';
import Book from "./components/Book";
import BookList from "./components/BookList";
import UserList from "./components/UserList";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
                        <Route path="/list" exact component={BookList}/>
                        <Route path="/users" exact component={UserList}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

