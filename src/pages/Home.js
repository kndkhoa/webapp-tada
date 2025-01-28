import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import News from "../components/News";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Home.css";
import avatar from "../components/assets/avatar.gif";
import Loading from "../components/loading";
import { preloadData } from "./api"; // Import từ file API

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
  const [courseData, setCourseData] = useState([]);
  const [charityData, setCharityData] = useState([]);
  const [giftData, setGiftData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [telegramId, setTelegramId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const apiKey = "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE";

  // Lấy ID từ URL hoặc gán mặc định
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("telegramId") || 9999; // Mặc định nếu không có ID
    setTelegramId(userId);
  }, [location.search]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    if (!telegramId) return;
  
    const fetchData = async () => {
      const cachedQuizData = sessionStorage.getItem("quizData");
      const cachedNewsData = sessionStorage.getItem("newsData");
      const cachedCourseData = sessionStorage.getItem("courseData");
      const cachedCharityData = sessionStorage.getItem("charityData");
      const cachedGiftData = sessionStorage.getItem("giftData");
      const cachedUserData = sessionStorage.getItem("userData");
  
      if (
        cachedQuizData &&
        cachedNewsData &&
        cachedCourseData &&
        cachedCharityData &&
        cachedGiftData &&
        cachedUserData
      ) {
        setQuizData(JSON.parse(cachedQuizData));
        setNewsData(JSON.parse(cachedNewsData));
        setCourseData(JSON.parse(cachedCourseData));
        setUserData(JSON.parse(cachedUserData));
        setCharityData(JSON.parse(cachedCharityData));
        setGiftData(JSON.parse(cachedGiftData));
        setIsLoading(false);
      } else {
        const preload = await preloadData(apiKey, telegramId);
        setQuizData(preload.quizData);
        setNewsData(preload.newsData);
        setCourseData(preload.courseData);
        setCharityData(preload.charityData);
        setGiftData(preload.giftData);
        setUserData(preload.userData);
  
        // Lưu vào sessionStorage
        sessionStorage.setItem("quizData", JSON.stringify(preload.quizData));
        sessionStorage.setItem("newsData", JSON.stringify(preload.newsData));
        sessionStorage.setItem("courseData", JSON.stringify(preload.courseData));
        sessionStorage.setItem("userData", JSON.stringify(preload.userData));
        sessionStorage.setItem("charityData", JSON.stringify(preload.charityData));
        sessionStorage.setItem("giftData", JSON.stringify(preload.giftData));
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [telegramId, apiKey]);
  

  // Tạo Map để kiểm tra trạng thái
  const quizStatusMap = useMemo(
    () => new Map(userData?.quiz_rank?.map((done) => [done.quizID, true])),
    [userData]
  );

  const newsStatusMap = useMemo(
    () => new Map(userData?.news_reads?.map((read) => [read.news_id, true])),
    [userData]
  );

  const navigateToDetail = (id, dataType) => {
    if (dataType === "Tin tức" || dataType === "TadaTV") {
      navigate(`/${dataType}/${id}`);
    } else if (dataType === "Đấu AC" || dataType === "Đấu USDT") {
      navigate(`/quiz/${id}?${dataType}`);
    } else if (dataType === "Courses") {
      navigate(`/courses/${id}`);
    }
  };

  return (
    <div className="home">
      {isLoading && <Loading />}
      <Header walletAC={userData?.wallet_AC} userId={userData?.userID} />
      <div className="rectangle-container">
        <div className="home-circle">
          <img src={avatar} alt="Gift Icon" />
        </div>
        <div className="rectangle">
          <div className="rectangle-text">{announText}</div>
        </div>
      </div>
      <main className="content-wrapper">
        <h2 className="title">Nổi bật</h2>
        {quizData.length === 0 ? (
          <Loading />
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
          >
            {quizData.map((item) => (
              <SwiperSlide
                key={item.id}
                onClick={() => navigateToDetail(item.id, item.dataType)}
              >
                <QuizCard
                  title={item.title}
                  description={item.description}
                  pic={item.banner}
                  prizeValue={item.prizeValue}
                  timer={item.timer}
                  topCompleters={item.topCompleters}
                  members={item.totalParticipants}
                  gift_title={item.gift_title}
                  status={quizStatusMap.has(item.id) ? 0 : 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="dynamic-content">
          <h2 className="title">Tin tức mới</h2>
        </div>
        {newsData.length === 0 ? (
          <Loading />
        ) : (
          <div>
            {newsData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateToDetail(item.id, item.dataType)}
              >
                <News
                  title={item.title}
                  description={item.description}
                  banner={item.banner}
                  heartValue={item.heart}
                  commentValue={item.comment}
                  ac={item.ac}
                  author={item.author}
                  created_at={item.created_at}
                  status={newsStatusMap.has(item.id) ? 0 : 1}
                />
              </div>
            ))}
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default Home;
