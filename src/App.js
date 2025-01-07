import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import các trang
import Home from './pages/Home'; 
import DauTruong from './pages/DauTruong';
import KhoTang from './pages/KhoTang';
import QuaThuong from './pages/QuaThuong';
import NewsDetail from './pages/NewsDetail';
import TadaTVDetail from './pages/TadaTVDetail';
import CourseDetail from './pages/CourseDetail';
import QuizDetail from './pages/QuizDetail';
import QuizStarting from './pages/QuizStarting';
import QuaThuongDetail from './pages/QuaThuongDetail';
import Setting from './pages/Setting';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dautruong" element={<DauTruong />} />
        <Route path="/khotang" element={<KhoTang />} />
        <Route path="/quathuong" element={<QuaThuong />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/tadatv/:id" element={<TadaTVDetail />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/quizstarting/:id" element={<QuizStarting />} />
        <Route path="/quathuongdetail/:id" element={<QuaThuongDetail />} />
        <Route path="/setting/:id" element={<Setting />} />
      </Routes>
    </div>
  );
};

export default App;
