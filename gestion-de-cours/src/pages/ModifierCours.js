import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ModifierCours = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        NomCours: '',
        DuréeCours: '',
        IdProf: '',
        IdSalle: '',
    });

    const [professeurs, setProfesseurs] = useState([]);
    const [salles, setSalles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les données du cours
                const coursResponse = await axios.get(`http://localhost:5002/api/cours/${id}`);
                // Convertir la durée en format hh:mm
                const formattedDuration = formatDuration(coursResponse.data.DuréeCours);
                setFormData({ ...coursResponse.data, DuréeCours: formattedDuration });

                // Récupérer les professeurs
                const profsResponse = await axios.get('http://localhost:5002/api/professeurs');
                setProfesseurs(profsResponse.data);

                // Récupérer les salles
                const sallesResponse = await axios.get('http://localhost:5002/api/salles');
                setSalles(sallesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    // Fonction pour convertir une durée en format hh:mm
    const formatDuration = (duration) => {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
        const matches = regex.exec(duration);
        const hours = matches[1] ? matches[1] : '0';
        const minutes = matches[2] ? matches[2] : '0';
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    // Fonction pour convertir une durée hh:mm en format ISO 8601
    const convertToISO8601Duration = (hhmm) => {
        const [hours, minutes] = hhmm.split(':').map(Number);
        let duration = 'PT';
        if (hours > 0) duration += `${hours}H`;
        if (minutes > 0) duration += `${minutes}M`;
        if (duration === 'PT') duration += '0S'; // Ajouter les secondes si rien d'autre
        return duration;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convertir la durée en format ISO 8601
            const isoDuration = convertToISO8601Duration(formData.DuréeCours);
            await axios.put(`http://localhost:5002/api/cours/${id}`, { ...formData, DuréeCours: isoDuration });
            navigate('/cours');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Modifier un Cours</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom du Cours:</label>
                    <input
                        type="text"
                        name="NomCours"
                        value={formData.NomCours}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Durée du Cours:</label>
                    <input
                        type="text"
                        name="DuréeCours"
                        value={formData.DuréeCours}
                        onChange={handleChange}
                        required
                        placeholder="hh:mm"
                    />
                </div>
                <div>
                    <label>Professeur:</label>
                    <select
                        name="IdProf"
                        value={formData.IdProf}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner un professeur</option>
                        {professeurs.map(prof => (
                            <option key={prof.IdProf} value={prof.IdProf}>
                                {prof.NomProf}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Salle:</label>
                    <select
                        name="IdSalle"
                        value={formData.IdSalle}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner une salle</option>
                        {salles.map(salle => (
                            <option key={salle.IdSalle} value={salle.IdSalle}>
                                {salle.Désignation}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default ModifierCours;
