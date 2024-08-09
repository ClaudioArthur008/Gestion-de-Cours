import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                        <h1 className="link-text">Coursera</h1>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/cours">
                        <img src="/icones/mycollection/png/Book.png" alt="cours" height="32" width="32" style={{ filter: 'grayscale(100%) opacity(0.7)' }} />
                        <span className="link-text">Cours</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/professeurs">
                        <img src="/icones/mycollection/png/Training.png" alt="professeur" height="32" width="32" style={{ filter: 'grayscale(100%) opacity(0.7)' }} />
                        <span className="link-text">Professeurs</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/salles">
                        <img src="/icones/mycollection/png/Room.png" alt="salle" height="32" width="32" style={{ filter: 'grayscale(100%) opacity(0.7)' }} />
                        <span className="link-text">Salles</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/classes">
                        <img src="/icones/mycollection/png/Classroom.png" alt="classe" height="32" width="32" style={{ filter: 'grayscale(100%) opacity(0.7)' }} />
                        <span className="link-text">Classes</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="/logout" style={{ marginBottom: '25px' }}>
                        <img src="/icones/mycollection/png/Exit.png" alt="déconnexion" height="32" width="32" />
                        <span className="link-text">Déconnexion</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
