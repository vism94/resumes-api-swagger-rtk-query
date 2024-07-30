// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import CandidatesPage from './components/pages/CandidatesPage';
import ResumePage from './components/pages/ResumePage';
import ImportantCommentsPage from './components/pages/ImportantCommentsPage';
import AcceptedResumesPage from './components/pages/AcceptedResumesPage';
import HomePage from './components/pages/HomePage'; // Импортируем новую главную страницу

export default function App(): JSX.Element {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Добавляем маршрут для главной страницы */}
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/candidates/:id" element={<ResumePage />} />
          <Route path="/comments/important" element={<ImportantCommentsPage />} />
          <Route path="/accepted" element={<AcceptedResumesPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
