import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to={"/"} className="navbar-brand">
            {/*    Ewentualne zrodlo i rozmiar ikonki/ obrazka/ zdjecia - prowadzące na stronę startowa */}
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Nav className="mr-auto">
                <Link to={"/add"} className="nav-link">Add Book </Link>
                <Link to={"/list"} className="nav-link">Book List </Link>
                <Link to={"/users"} className="nav-link">Users </Link>
            </Nav>
        </Navbar>
    );
}

