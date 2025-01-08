import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import News from "../components/News";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./Home.css";
import avatar from '../components/assets/avatar.gif';

// Example API functions
const fetchQuizData = async () => {
  // Replace this URL with your API URL for quiz data
  const response = await fetch('https://your-api-url.com/quiz');
  const data = await response.json();
  return data;
};

const fetchNewsData = async () => {
  // Replace this URL with your API URL for news data
  const response = await fetch('https://your-api-url.com/news');
  const data = await response.json();
  return data;
};

const announData = [
  "Chào mừng bạn đến với Đấu Trường!",
  "Đừng bỏ lỡ cơ hội nhận giải thưởng lớn!",
  "Khám phá ngay các item hấp dẫn!",
  "Tìm hiểu thêm về các chương trình ưu đãi!",
  "Heleng Nguyen đóng góp 1500 TBC cho Quỹ khuyến học TadaBee - 2 tiếng trước",
];

function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [announText, setAnnounText] = useState(announData[0]);
  const [currentAnnounIndex, setCurrentAnnounIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  
  const navigate = useNavigate(); // Declare navigate

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnounIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % announData.length;
        setAnnounText(announData[nextIndex]);
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch data from APIs when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const quiz = await fetchQuizData();
      const news = await fetchNewsData();
      setQuizData(quiz);
      setNewsData(news);
    };

    loadData();
  }, []);

  const filtereditemzes = quizData.filter((item) => item.highlight === activeTab);
  const filteredNews = newsData;

  // Navigate to the detailed page based on type and ID
  const navigateToDetail = (id, dataType, menu) => {
    if (menu === 'news') {
      navigate(`/news/${id}`);
    } else if (menu === 'tadatv') {
      navigate(`/tadatv/${id}`);
    } else if (menu === 'course') {
      navigate(`/course/${id}`);
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
          {filteredNews.map(item => {
            if (item.menu === 'news') {
              return (
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
              );
            }
            return null;
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
