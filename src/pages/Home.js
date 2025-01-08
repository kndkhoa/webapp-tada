import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; 
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
  const [userInfo, setUserInfo] = useState(null);  // Thêm state để lưu thông tin người dùng
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);  // Thêm state cho loading user info
  const [error, setError] = useState("");

  const apiKey = "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE";  // API key từ biến môi trường
  const { userId } = useParams();  // Lấy userId từ URL
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

    // Fetch User Info Data
    const fetchUserInfo = async () => {
      if (!userId) return;  // Nếu không có userId thì không thực hiện gọi API

      try {
        const response = await fetch(`http://admin.tducoin.com/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': apiKey,  // Sử dụng API key từ môi trường
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          setError("Không thể lấy thông tin người dùng.");
        }
      } catch (error) {
        setError("Lỗi kết nối với API thông tin người dùng.");
      } finally {
        setLoadingUserInfo(false);
      }
    };

    fetchQuizData();
    fetchNewsData();
    fetchUserInfo();  // Gọi API lấy thông tin người dùng

  }, [userId]);  // Gọi lại API khi userId thay đổi

  if (loadingQuiz || loadingNews || loadingUserInfo) {
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
        <h2 className="title">Thông tin người dùng</h2>
        {userInfo ? (
          <div>
            <h3>{userInfo.name}</h3>
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
            {/* Hiển thị các thông tin khác của người dùng */}
          </div>
        ) : (
          <div>Không tìm thấy thông tin người dùng.</div>
        )}
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
