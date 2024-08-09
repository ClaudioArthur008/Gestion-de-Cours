import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import axiosInstance from '../axiosInstance';
import { Link, useLocation } from 'react-router-dom';

const Salle = () => {
    const [salles, setSalle] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchSalle = async () => {
            try {
                const searchTerm = new URLSearchParams(location.search).get('search') || '';
                const response = await axiosInstance.get('/api/salles/search', {
                    params: { search: searchTerm },
                    withCredentials: true
                });
                console.log("Salles data:", response.data);  // Log des données reçues
                setSalle(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des salles:", error);
            }
        };

        fetchSalle();
    }, [location]);

    const deleteSalle = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette salle ?")) {
            try {
                await axiosInstance.delete(`/api/salles/${id}`, {
                    withCredentials: true
                });
                setSalle(salles.filter(salle => salle.IdSalle !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression du professeur:", error);
            }
        }
    };

    return (
        <div>
            <h1>Liste des Salles</h1>
            <SearchBar />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Numéro Salle</th>
                        <th>Désignation</th>
                        <th>Disponibilité</th>
                        <th>Capacité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salles && salles.length > 0 ? (
                        salles.map(salle => (
                            <tr key={salle.IdSalle}>
                                <td>{salle.IdSalle}</td>
                                <td>{salle.Désignation}</td>
                                <td>{salle.IsDisponible ? 'Disponible' : 'Indisponible'}</td>
                                <td>{salle.Capacité}</td>
                                <td className='actionsLigne'>
                                    <Link to={`/salles/update/${salle.IdSalle}`} className="modifier-btn"><img src="/icones/mycollection/png/stylo-modifier.png" alt="Modifier" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Modifier</Link>
                                    <button className="supprimer-btn" onClick={() => deleteSalle(salle.IdSalle)}><img src="/icones/mycollection/png/supprimer.png" alt="Supprimer" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Aucune Salle disponible.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Salle;