import React from 'react';
import UploadSection from './components/UploadSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Predictor from './pages/Predictor';
import StartPage from "./pages/Startpage"
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
  );
};

export default App;
