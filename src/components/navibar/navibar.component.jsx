import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function Navibar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to={"/"} className="navbar-brand">
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Nav className="mr-auto">
                <Link to={"/achievementsList"} className="nav-link">Achievements </Link>
            </Nav>
        </Navbar>
    );
}

