import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import axiosInstance from '../axiosInstance';
import { Link, useLocation } from 'react-router-dom';

const Cours = () => {
    const [cours, setCours] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);
    const [classes, setClasses] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les cours
                const searchTerm = new URLSearchParams(location.search).get('search') || '';
                const coursResponse = await axiosInstance.get('/api/Cours/search', {
                    params: { search: searchTerm },
                    withCredentials: true
                });
                setCours(coursResponse.data);

                // Récupérer les professeurs
                const profsResponse = await axiosInstance.get('/api/Professeurs');
                setProfesseurs(profsResponse.data);

                const classesResponse = await axiosInstance.get('/api/Classes');
                setClasses(classesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [location]);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce cours ?")) {
            try {
                await axiosInstance.delete(`/api/Cours/${id}`);
                setCours(cours.filter(c => c.IdCours !== id));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    };

    const formatDuration = (durationString) => {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const matches = regex.exec(durationString);

        const hours = matches[1] ? matches[1] + ' heure(s)' : '';
        const minutes = matches[2] ? matches[2] + ' minute(s)' : '';
        const seconds = matches[3] ? matches[3] + ' seconde(s)' : '';

        return [hours, minutes, seconds].filter(Boolean).join(' ');
    };

    const getProfesseurName = (idProf) => {
        const prof = professeurs.find(p => p.IdProf === idProf);
        return prof ? prof.NomProf : 'Inconnu';
    };

    const getClasseNiveau = (IdClasse) => {
        const classe = classes.find(c => c.IdClasse === IdClasse);
        return classe ? classe.Niveau : 'Inconnu';
    }

    return (
        <div>
            <h1>Liste des Cours</h1>
            <SearchBar />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Code Cours</th>
                        <th>Nom</th>
                        <th>Date</th>
                        <th>Durée</th>
                        <th>Nom du Professeur</th>
                        <th>Niveau de la classe</th>
                        <th>Salle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cours && cours.length > 0 ? (
                        cours.map(cours => (
                            <tr key={cours.IdCours}>
                                <td>{cours.IdCours}</td>
                                <td>{cours.NomCours}</td>
                                <td>{formatDate(cours.DateCours)}</td>
                                <td>{formatDuration(cours.DuréeCours)}</td>
                                <td>{getProfesseurName(cours.IdProf)}</td>
                                <td>{getClasseNiveau(cours.IdClasse)}</td>
                                <td>{cours.IdSalle}</td>
                                <td className='actionsLigne'>
                                    <Link to={`/cours/update/${cours.IdCours}`} className="modifier-btn">
                                        <img src="/icones/mycollection/png/stylo-modifier.png" alt="Modifier" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Modifier
                                    </Link>
                                    <button className="supprimer-btn" onClick={() => handleDelete(cours.IdCours)}>
                                        <img src="/icones/mycollection/png/supprimer.png" alt="Supprimer" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Aucun cours disponible.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Cours;
