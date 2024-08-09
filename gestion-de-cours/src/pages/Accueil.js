import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import './Accueil.css';

const Accueil = () => {
    const [counts, setCounts] = useState({
        classes: 0,
        professeurs: 0,
        salles: 0,
        cours: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [classesRes, professeursRes, sallesRes, coursRes] = await Promise.all([
                    axiosInstance.get('/api/count/classes/count'),
                    axiosInstance.get('/api/count/professeurs/count'),
                    axiosInstance.get('/api/count/salles/count'),
                    axiosInstance.get('/api/count/cours/count')
                ]);

                setCounts({
                    classes: classesRes.data,
                    professeurs: professeursRes.data,
                    salles: sallesRes.data,
                    cours: coursRes.data
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="home-cards">
            <div className="card">
                <h3>Classes</h3>
                <p>{counts.classes}</p>
            </div>
            <div className="card">
                <h3>Professeurs</h3>
                <p>{counts.professeurs}</p>
            </div>
            <div className="card">
                <h3>Salles</h3>
                <p>{counts.salles}</p>
            </div>
            <div className="card">
                <h3>Cours</h3>
                <p>{counts.cours}</p>
            </div>
        </div>
    );
};

export default Accueil;
