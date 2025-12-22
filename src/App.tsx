import { HashRouter, Routes, Route } from 'react-router-dom';
import { PresentationPage } from './pages/PresentationPage';

function App() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#2383e2',
        color: 'white',
        padding: '10px',
        zIndex: 9999,
        textAlign: 'center',
        direction: 'rtl'
      }}>
        التقرير السنوي - بث حديث 2025
      </div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<PresentationPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
