import React from 'react';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import NavibarComponent from './components/navibar/navibar.component';
import HomepageComponent from "./pages/homepage/homepage.component";
import FooterComponent from './components/footer/footer.component';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AchievementsListComponent from "./pages/achievements-list/achievements-list.component";
import AchievementActionComponent from "./components/achievement-action/achievement-action.component";
import RealizationActionComponent from "./components/realization-action/realization-action.component";
import RealizationListComponent from "./pages/realization-list/realization-list.component";

export default function App() {
    const marginTop = {
        marginTop:"20px"
    }

    const heading = "Achievements Game";
    const quote = "Madry cytat ... "
    const footer = "Madry człowiek"

  return (
    <Router>
        <NavibarComponent />
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={() => <HomepageComponent heading={heading} quote={quote} footer={footer} />} />/>}/>
                        <Route path="/achievementsList" exact component={AchievementsListComponent}/>
                        <Route path="/achievement/:achievementId" exact component={AchievementActionComponent}/>
                        <Route path='/realization' exact component={RealizationActionComponent}/>
                        <Route path='/edit/:realizationId' exact component={RealizationActionComponent}/>
                        <Route path='/realizationList/:questId' exact component={RealizationListComponent}/>/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <FooterComponent/>
    </Router>
  );
}

