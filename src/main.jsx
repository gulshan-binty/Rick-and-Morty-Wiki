import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import CastPage from './pages/CastPage.jsx';
import CharacterDetails from './pages/CharacterDetails.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/castPage" element={<CastPage />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
    </Routes>
  </BrowserRouter>
);
