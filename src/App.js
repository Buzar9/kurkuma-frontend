import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import Navibar from './components/navibar/navibar.component';
import Homepage from "./pages/homepage/homepage.component";
import Footer from './components/footer/footer.component';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AchievementsList from "./pages/achievements-list/achievements-list.component";
import AchievementAction from "./components/achievement-action/achievement.action";
import RealizationAction from "./components/realization-action/realization-action.component";
import RealizationList from "./pages/realization-list/realization-list.component";

export default function App() {
    const marginTop = {
        marginTop:"20px"
    }

    const heading = "Achievements Game";
    const quote = "Madry cytat ... "
    const footer = "Madry człowiek"

  return (
    <Router>
        <Navibar />
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={() => <Homepage heading={heading} quote={quote} footer={footer} />} />/>}/>
                        <Route path="/achievementsList" exact component={AchievementsList}/>
                        <Route path="/achievement/:achievementId" exact component={AchievementAction}/>
                        <Route path='/realization' exact component={RealizationAction}/>
                        <Route path='/edit/:realizationId' exact component={RealizationAction}/>
                        <Route path='/realizationList/:questId' exact component={RealizationList}/>/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

