import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MapEditor from './pages/MapEditor';
import PublicMapView from './pages/PublicMapView';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* CTO Dashboard (Mock Auth) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* The Lab — Map Editor */}
        <Route path="/lab/:mapId" element={<MapEditor />} />

        {/* Public view — dynamic user routing */}
        <Route path="/:slug" element={<PublicMapView />} />
      </Routes>
    </AnimatePresence>
  );
}
