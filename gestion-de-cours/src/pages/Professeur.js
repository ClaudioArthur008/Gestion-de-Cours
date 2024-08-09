import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import axiosInstance from '../axiosInstance';
import { Link, useLocation } from 'react-router-dom';

const Professeur = () => {
    const [professeurs, setProfesseurs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProfesseurs = async () => {
            try {
                const searchTerm = new URLSearchParams(location.search).get('search') || '';
                const response = await axiosInstance.get('/api/professeurs/search', {
                    params: { search: searchTerm },
                    withCredentials: true
                });
                console.log("Professeurs data:", response.data);  // Log des données reçues
                setProfesseurs(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des professeurs:", error);
            }
        };

        fetchProfesseurs();
    }, [location]);

    const deleteProfesseur = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce professeur ?")) {
            try {
                await axiosInstance.delete(`/api/professeurs/${id}`, {
                    withCredentials: true
                });
                setProfesseurs(professeurs.filter(prof => prof.IdProf !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression du professeur:", error);
            }
        }
    };

    return (
        <div>
            <h1>Liste des Professeurs</h1>
            <SearchBar />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Identifiant du Professeur</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Grade</th>
                        <th>Disponibilité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {professeurs && professeurs.length > 0 ? (
                        professeurs.map(prof => (
                            <tr key={prof.IdProf}>
                                <td>{prof.IdProf}</td>
                                <td>{prof.NomProf}</td>
                                <td>{prof.PrenomProf}</td>
                                <td>{prof.Grade}</td>
                                <td>{prof.IsDisponible ? 'Disponible' : 'Indisponible'}</td>
                                <td className='actionsLigne'>
                                    <Link to={`/professeurs/update/${prof.IdProf}`} className="modifier-btn"><img src="/icones/mycollection/png/stylo-modifier.png" alt="Modifier" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Modifier</Link>
                                    <button className="supprimer-btn" onClick={() => deleteProfesseur(prof.IdProf)}><img src="/icones/mycollection/png/supprimer.png" alt="Supprimer" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Aucun Professeur disponible</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Professeur;
