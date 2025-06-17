import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.scss";

const Navbar: React.FC = () => {
    return (
        <div className="d-flex justify-content-between align-items-center navbar">
            <div className="d-flex justify-content-start align-items-center">
                <Link to="/">
                    <img
                        src="https://images.ctfassets.net/phva2knh4vy5/59uDDesQq19p5lVzfe45BY/a89feaa950427ef005c9d028e925bef0/Full_colour_crest.png?fm=webp&fit=pad&f=center&w=144&h=144&q=100"
                        alt="Leeds crest"
                        className="navbar-logo"
                    />
                </Link>
                <nav className="navbar-links ms-4">
                    <Link to="/" className="me-3">
                        Search
                    </Link>
                    <Link to="/watchlist" className="me-3">
                        Watchlist
                    </Link>
                    <Link to="/leeds-squad">Leeds Squad</Link>
                </nav>
            </div>
            <ThemeToggle />
        </div>
    );
};

export default Navbar;
