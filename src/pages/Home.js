import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import News from "../components/News";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./Home.css";
import avatar from '../components/assets/avatar.gif';

function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [announText, setAnnounText] = useState("");
  const [currentAnnounIndex, setCurrentAnnounIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [announData, setAnnounData] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState("");

  const apiKey = "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE";  // API key từ biến môi trường
  
  const navigate = useNavigate(); // Khai báo navigate

  useEffect(() => {
    // Fetch Quiz Data
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://admin.tducoin.com/api/quiz', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': apiKey,  // Sử dụng API key từ môi trường
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          setError("Không thể lấy dữ liệu quiz.");
        }
      } catch (error) {
        setError("Lỗi kết nối với API Quiz.");
      } finally {
        setLoadingQuiz(false);
      }
    };

    // Fetch News Data
    const fetchNewsData = async () => {
      try {
        const response = await fetch('http://admin.tducoin.com/api/news', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': apiKey,  // Sử dụng API key từ môi trường
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        } else {
          setError("Không thể lấy dữ liệu tin tức.");
        }
      } catch (error) {
        setError("Lỗi kết nối với API News.");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchQuizData();
    fetchNewsData();
  }, []);  // Không cần apiKey trong dependency vì nó là cố định

  if (loadingQuiz || loadingNews) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filtereditemzes = quizData.filter((item) => item.highlight === activeTab);
  const filteredNews = newsData;

  const navigateToDetail = (id, dataType, menu) => {
    if (menu === 'news') {
      navigate(`/news/${id}`);
    } else if (menu === 'quiz') {
      navigate(`/quiz/${id}?${dataType}`);
    }
  };

  return (
    <div className="home">
      <Header />
      <div className="rectangle-container">
        <div className="home-circle">
          <img src={avatar} alt="Gift Icon" />
        </div>
        <div className="rectangle">
          <div className="rectangle-text">
            {announText}
          </div>
        </div>
      </div>
      <main className="content-wrapper">
        <h2 className="title">Nổi bật</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            type: 'bullets',
          }}
        >
          {filtereditemzes.map((item) => (
            <SwiperSlide key={item.id} onClick={() => navigateToDetail(item.id, item.dataType, item.menu)}>
              <QuizCard
                title={item.title}
                description={item.description}
                pic={item.pic}
                value={item.value}
                timer={item.timer}
                avatar1={item.avatar1}
                avatar2={item.avatar2}
                avatar3={item.avatar3}
                avatar4={item.avatar4}
                members={item.members}
                completed={item.completed}
                gift_title={item.gift_title}
                status={item.status}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="dynamic-content">
          <h2 className="title">Tin tức mới</h2>
        </div>
        <div>
          {filteredNews.map(item => (
            <div key={item.id} onClick={() => navigateToDetail(item.id, item.dataType, item.menu)}>
              <News
                title={item.title}
                description={item.description}
                pic={item.pic}
                heartValue={item.heartValue}
                commentValue={item.commentValue}
                coinactive={item.coinactive}
                name={item.name}
                time={item.time}
                status={item.status}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
