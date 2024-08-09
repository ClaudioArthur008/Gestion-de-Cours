import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const ModifierProfesseur = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [professeur, setProfesseur] = useState({
        NomProf: '',
        PrenomProf: '',
        Grade: ''
    });

    useEffect(() => {
        const fetchProfesseur = async () => {
            try {
                const response = await axiosInstance.get(`/api/professeurs/${id}`);
                setProfesseur(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du professeur:', error);
            }
        };

        fetchProfesseur();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfesseur((prevProf) => ({
            ...prevProf,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/professeurs/${id}`, professeur);
            navigate('/professeurs'); // Redirect to the list of professors after updating
        } catch (error) {
            console.error('Erreur lors de la mise à jour du professeur:', error);
        }
    };

    if (!professeur) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Modifier Professeur</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="NomProf"
                        value={professeur.NomProf}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="PrenomProf"
                        value={professeur.PrenomProf}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Grade:</label>
                    <input
                        type="text"
                        name="Grade"
                        value={professeur.Grade}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default ModifierProfesseur;
