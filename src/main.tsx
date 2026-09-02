import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import SimuladoPage from './SimuladoPage.tsx';
import ApostilaPage from './ApostilaPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/simulado-1" element={<SimuladoPage />} />
        <Route path="/apostila" element={<ApostilaPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
