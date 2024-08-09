import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cours from './pages/Cours';
import Professeur from './pages/Professeur';
import Salle from './pages/Salle';
import Classe from './pages/Classe';
import Navbar from './components/Navbar';
import NouveauProfesseur from './pages/AjouterProfesseur.js';
import NouvelleClasse from './pages/AjouterClasse.js';
import NouveauCours from './pages/AjouterCours.js';
import NouvelleSalle from './pages/AjouterSalle.js';
import ModifierProfesseur from './pages/ModifierProfesseur.js';
import ModifierSalle from './pages/ModifierSalle.js';
import ModifierClasse from './pages/ModifierClasse.js';
import ModifierCours from './pages/ModifierCours.js';
import Accueil from './pages/Accueil.js';


function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/professeurs" element={<Professeur />} />
          <Route path="/salles" element={<Salle />} />
          <Route path="/classes" element={<Classe />} />
          <Route path="/professeurs/create" element={<NouveauProfesseur />} />
          <Route path="/classes/create" element={<NouvelleClasse />} />
          <Route path="/salles/create" element={<NouvelleSalle />} />
          <Route path="/cours/create" element={<NouveauCours />} />
          <Route path="/professeurs/update/:id" element={<ModifierProfesseur />} />
          <Route path="/salles/update/:id" element={<ModifierSalle />} />
          <Route path="/classes/update/:id" element={<ModifierClasse />} />
          <Route path="/cours/update/:id" element={<ModifierCours />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
