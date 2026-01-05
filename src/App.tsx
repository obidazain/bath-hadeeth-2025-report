import { HashRouter, Routes, Route } from 'react-router-dom';
import { PresentationPage } from './pages/PresentationPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PresentationPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
