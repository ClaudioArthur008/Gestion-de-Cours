import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const ModifierSalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [salle, setSalle] = useState({
        Désignation: '',
        Capacité: ''
    });

    useEffect(() => {
        const fetchSalle = async () => {
            try {
                const response = await axiosInstance.get(`/api/salles/${id}`);
                setSalle(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la salle:', error);
            }
        };

        fetchSalle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalle((prevSalle) => ({
            ...prevSalle,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/salles/${id}`, salle);
            navigate('/salles'); //Redirection
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la salle:', error);
        }
    };

    if (!salle) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Modifier une Salle</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Désignation:</label>
                    <input
                        type="text"
                        name="Désignation"
                        value={salle.Désignation}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Capacité :</label>
                    <input
                        type="text"
                        name="Capacité"
                        value={salle.Capacité}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default ModifierSalle;
