import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const NouveauCours = () => {
    const [formData, setFormData] = useState({
        NomCours: '',
        DateCours: '',
        DuréeCours: '',
        IdProf: '',
        IdSalle: '',
        IdClasse: '',
    });

    const [professeurs, setProfesseurs] = useState([]);
    const [salles, setSalles] = useState([]);
    const [classes, setClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profsResponse = await axiosInstance.get('/api/professeurs');
                setProfesseurs(profsResponse.data);
                console.log('Professeurs:', profsResponse.data);

                const sallesResponse = await axiosInstance.get('/api/salles');
                setSalles(sallesResponse.data);
                console.log('Salles:', sallesResponse.data);

                const classesResponse = await axiosInstance.get('/api/classes');
                setClasses(classesResponse.data);
                console.log('Classes:', classesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Récupérer les ressources sélectionnées
        const selectedProf = professeurs.find(prof => prof.IdProf === formData.IdProf);
        const selectedSalle = salles.find(salle => parseInt(salle.IdSalle) === parseInt(formData.IdSalle));
        const selectedClasse = classes.find(classe => parseInt(classe.IdClasse) === parseInt(formData.IdClasse));

        console.log('Selected Professor:', selectedProf);
        console.log('Selected Salle:', selectedSalle);
        console.log('Selected Classe:', selectedClasse);

        // Vérifier la disponibilité de chaque ressource
        const profAvailable = selectedProf?.IsDisponible;
        const salleAvailable = selectedSalle?.IsDisponible;
        const classeAvailable = selectedClasse?.IsDisponible;

        console.log('Prof Available:', profAvailable);
        console.log('Salle Available:', salleAvailable);
        console.log('Classe Available:', classeAvailable);

        // Messages d'erreur spécifiques
        const messages = [];
        if (!profAvailable) messages.push('Le professeur sélectionné est déjà occupé(e) pour cette période.');
        if (!salleAvailable) messages.push('La salle sélectionnée est déjà occupée pour cette période.');
        if (!classeAvailable) messages.push('La classe sélectionnée est déjà occupée pour cette période.');

        // Si toutes les ressources sont indisponibles
        if (!profAvailable && !salleAvailable && !classeAvailable) {
            setErrorMessage('Le professeur, la salle et la classe sélectionnés sont déjà occupés pour cette période.');
            return;
        }

        // Si certaines ressources sont indisponibles
        if (messages.length > 0) {
            setErrorMessage(messages.join(' '));
            return;
        }

        // Convertir DuréeCours au format TimeSpan
        const [hours, minutes] = formData.DuréeCours.split(':');
        const duréeCours = `PT${hours}H${minutes}M`;

        // Convertir DateCours en UTC
        const date = new Date(formData.DateCours);
        const dateUTC = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

        const data = { ...formData, DateCours: dateUTC, DuréeCours: duréeCours };

        try {
            console.log('Data to be sent:', data);  // Debugging output
            const response = await axiosInstance.post('/api/cours', data);
            console.log('Response:', response.data);
            navigate('/cours');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h2>Ajouter un Cours</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
                    <label>Date du Cours:</label>
                    <input
                        type="datetime-local"
                        name="DateCours"
                        value={formData.DateCours}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Durée du Cours (hh:mm):</label>
                    <input
                        type="time"
                        name="DuréeCours"
                        value={formData.DuréeCours}
                        onChange={handleChange}
                        required
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
                                {prof.NomProf} {prof.IsDisponible ? '' : '(Indisponible)'}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Classe:</label>
                    <select
                        name="IdClasse"
                        value={formData.IdClasse}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner une classe</option>
                        {classes.map(classe => (
                            <option key={classe.IdClasse} value={classe.IdClasse}>
                                {classe.Niveau} {classe.IsDisponible ? '' : '(Indisponible)'}
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
                                {salle.Désignation} {salle.IsDisponible ? '' : '(Indisponible)'}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default NouveauCours;
