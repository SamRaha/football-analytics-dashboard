// src/components/Navbar.tsx
import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.scss";

const AppNavbar: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar expand="md" className="navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img src="https://images.ctfassets.net/phva2knh4vy5/59uDDesQq19p5lVzfe45BY/a89feaa950427ef005c9d028e925bef0/Full_colour_crest.png" alt="Leeds crest" className="navbar-logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

                <Navbar.Offcanvas show={show} onHide={handleClose} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" className="offcanvas-fullscreen">
                    <Offcanvas.Header closeButton />
                    <Offcanvas.Body className="d-flex flex-column">
                        <Nav className="flex-grow-1">
                            <Nav.Link as={Link} to="/" onClick={handleClose}>
                                Search
                            </Nav.Link>
                            <Nav.Link as={Link} to="/watchlist" onClick={handleClose}>
                                Watchlist
                            </Nav.Link>
                            <Nav.Link as={Link} to="/leeds-squad" onClick={handleClose}>
                                Leeds Squad
                            </Nav.Link>
                        </Nav>

                        {/* mobile toggle at bottom */}
                        <div className="d-md-none mt-auto">
                            <ThemeToggle />
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                {/* desktop toggle on right */}
                <div className="d-none d-md-block ms-auto">
                    <ThemeToggle />
                </div>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
