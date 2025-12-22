import { HashRouter, Routes, Route } from 'react-router-dom';
import { PresentationPage } from './pages/PresentationPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PresentationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
