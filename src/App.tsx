import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PresentationPage } from './pages/PresentationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/presentation" replace />} />
        <Route path="/presentation" element={<PresentationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
