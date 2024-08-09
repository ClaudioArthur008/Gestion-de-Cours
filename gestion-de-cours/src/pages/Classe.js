import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import axiosInstance from '../axiosInstance';
import { Link, useLocation } from 'react-router-dom';

const Classe = () => {
    const [classes, setClasses] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const searchTerm = new URLSearchParams(location.search).get('search') || '';
                const response = await axiosInstance.get('/api/classes/search', {
                    params: { search: searchTerm },
                    withCredentials: true
                });
                console.log("Classes data:", response.data);  // Log des données reçues
                setClasses(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des classes:", error);
            }
        };
        fetchClasses();
    }, [location]);

    const deleteClasse = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette classe ?")) {
            try {
                await axiosInstance.delete(`/api/classes/${id}`, {
                    withCredentials: true
                });
                setClasses(classes.filter(classe => classe.IdClasse !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression de la classe:", error);
            }
        }
    };

    return (
        <div>
            <h1>Liste des Classes</h1>
            <SearchBar />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Identifiant de la classe</th>
                        <th>Niveau</th>
                        <th>Nombre d'étudiants</th>
                        <th>Disponibilité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes && classes.length > 0 ? (
                        classes.map(classe => (
                            <tr key={classe.IdClasse}>
                                <td>{classe.IdClasse}</td>
                                <td>{classe.Niveau}</td>
                                <td>{classe.NombreElèves}</td>
                                <td>{classe.IsDisponible ? 'Disponible' : 'Indisponible'}</td>
                                <td className='actionsLigne'>
                                    <Link to={`/salles/update/${classe.IdSalle}`} className="modifier-btn"><img src="/icones/mycollection/png/stylo-modifier.png" alt="Modifier" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Modifier</Link>
                                    <button className="supprimer-btn" onClick={() => deleteClasse(classe.IdClasse)}><img src="/icones/mycollection/png/supprimer.png" alt="Supprimer" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Aucune classe disponible.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Classe;
