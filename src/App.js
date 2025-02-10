import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import các trang
import Home from './pages/Home'; 
import FundBot from './pages/FundBot';
import DauTruong from './pages/DauTruong';
import KhoTang from './pages/KhoTang';
import Earn from './pages/Earn';
import QuaThuong from './pages/QuaThuong';
import NewsDetail from './pages/NewsDetail';
import SignalChart from './pages/SignalChart';
import TadaTVDetail from './pages/TadaTVDetail';
import CourseDetail from './pages/CourseDetail';
import QuizDetail from './pages/QuizDetail';
import QuizStarting from './pages/QuizStarting';
import QuaThuongDetail from './pages/QuaThuongDetail';
import Setting from './pages/Setting';

// Import AppWrapper
import AppWrapper from './components/AppWrapper';

const App = () => {
  const [userData, setUserData] = useState(null); // Lưu trữ dữ liệu người dùng
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  // Hàm lấy dữ liệu người dùng từ API
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/get-user-data");
      const data = await response.json();
      setUserData(data);
      sessionStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Lấy dữ liệu người dùng khi ứng dụng load
  }, []);

  // Hàm xử lý khi visibility change, gọi setUserData để làm mới dữ liệu
  const handleVisibilityChange = () => {
    fetchUserData(); // Gọi lại API hoặc cập nhật dữ liệu từ sessionStorage
  };

  return (
    <div className="App">
      <AppWrapper onVisibilityChange={handleVisibilityChange}> {/* Truyền hàm làm mới dữ liệu */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/fundbot" element={<FundBot />} />
            <Route path="/dautruong" element={<DauTruong />} />
            <Route path="/khotang" element={<KhoTang />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/quathuong" element={<QuaThuong />} />
            <Route path="/Tin tức/:id" element={<NewsDetail />} />
            <Route path="/chart" element={<SignalChart />} />
            <Route path="/tadatv/:id" element={<TadaTVDetail />} />
            <Route path="/Courses/:id" element={<CourseDetail />} />
            <Route path="/quiz/:id" element={<QuizDetail />} />
            <Route path="/quizstarting/:id" element={<QuizStarting />} />
            <Route path="/quathuongdetail/:id" element={<QuaThuongDetail />} />
            <Route path="/setting/:id" element={<Setting />} />
          </Routes>
        </AnimatePresence>
      </AppWrapper>
    </div>
  );
};

export default App;
