import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        // Determine the current path to set the correct search URL
        let path = '/';
        switch (location.pathname) {
            case '/professeurs':
                path = '/professeurs';
                break;
            case '/classes':
                path = '/classes';
                break;
            case '/salles':
                path = '/salles';
                break;
            case '/cours':
                path = '/cours';
                break;
            default:
                path = '/';
                break;
        }

        // Navigate to the appropriate search URL
        navigate(`${path}?search=${searchTerm}`);
    };


    const placeholderPages = () => {
        switch (location.pathname) {
            case '/professeurs':
                return "Rechercher par nom ou prénoms ou grade...";
            case '/classes':
                return "Rechercher par niveau ou nombre d'élèves...";
            case '/salles':
                return "Rechercher par capacité ou désignation...";
            case '/cours':
                return "Rechercher par date ou durée ou nom..."
            default:
                return "Rechercher...";
        }
    }


    const getButtonDetails = () => {
        switch (location.pathname) {
            case '/professeurs':
                return { label: 'Nouveau Professeur', icon: '/icones/mycollection/png/add-user.png', path: '/professeurs/create' };
            case '/classes':
                return { label: 'Nouvelle Classe', icon: '/icones/mycollection/png/add-group.png', path: '/classes/create' };
            case '/salles':
                return { label: 'Nouvelle Salle', icon: '/icones/mycollection/png/hotel.png', path: '/salles/create' };
            case '/cours':
                return { label: 'Nouveau Cours', icon: '/icones/mycollection/png/ajouterLivre.png', path: '/cours/create' };
            default:
                return 'Nouveau';
        }
    };

    const buttonDetails = getButtonDetails();

    return (
        <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '30px'
        }}>
            <Link to={buttonDetails.path} className="ajouter-btn">
                <img src={buttonDetails.icon} alt={buttonDetails.label} style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                {buttonDetails.label}
            </Link>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <img src="/icones/mycollection/png/search.png" alt="recherche" style={{ width: '32px' }} />
                <input
                    type="search"
                    placeholder={placeholderPages()}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </form>
        </div>
    );
};

export default SearchBar;