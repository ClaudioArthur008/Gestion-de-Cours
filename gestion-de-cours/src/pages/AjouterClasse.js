import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NouvelleClasse = () => {
    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        IdClasse: '',
        Niveau: '',
        NombreElèves: ''
    });

    // Hook pour la navigation
    const navigate = useNavigate();

    // Fonction pour mettre à jour les données du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        try {
            const response = await axios.post('http://localhost:5002/api/classes', formData);
            console.log('Response:', response.data);
            navigate('/classes');
        } catch (error) {
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code d'état
                // qui ne fait pas partie de la plage 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error('Error request:', error.request);
            } else {
                // Quelque chose s'est passé lors de la configuration de la requête qui a déclenché une erreur
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className='inner'>
            <h2>Ajouter une Classe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro de la Classe :</label>
                    <input
                        type='text'
                        name='IdClasse'
                        value={formData.IdClasse}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Niveau :</label>
                    <input
                        type="text"
                        name="Niveau"
                        value={formData.Niveau}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre d'étudiants :</label>
                    <input
                        type="text"
                        name="NombreElèves"
                        value={formData.NombreElèves}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default NouvelleClasse;
