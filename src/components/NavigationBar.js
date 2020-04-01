import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to={"/"} className="navbar-brand">
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Nav className="mr-auto">
                <Link to={"/add"} className="nav-link">Add Book </Link>
                <Link to={"/userslist"} className="nav-link">Users </Link>
                <Link to={"/usersdata"} className="nav-link">Users Data </Link>
            </Nav>
        </Navbar>
    );
}

