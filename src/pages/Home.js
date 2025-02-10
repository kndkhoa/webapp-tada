import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import News from "../components/News";
import Signal from "../components/Signal";
import Channel from "../components/Channel";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Home.css";
import avatar from "../components/assets/avatar.gif";
import Loading from "../components/loading";
import { preloadData } from "./api"; // Import từ file API

const announData = [
  "Welcome to Finance World!",
  "Đừng bỏ lỡ cơ hội nhận giải thưởng lớn!",
  "Khám phá ngay các item hấp dẫn!",
  "Tìm hiểu thêm về các chương trình ưu đãi!",
  "Heleng Nguyen đóng góp 1500 TBC cho Quỹ khuyến học TadaBee - 2 tiếng trước",
];

const formatDate = (dateString) => {
  if (!dateString) return ""; // Xử lý trường hợp dateString là null hoặc undefined

  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${hours}:${minutes} - ${day}/${month}`;
};

function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [announText, setAnnounText] = useState(announData[0]);
  const [currentAnnounIndex, setCurrentAnnounIndex] = useState(0);
  const [signalData, setSignalData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [charityData, setCharityData] = useState([]);
  const [giftData, setGiftData] = useState([]);
  const [walletAC, setWalletAC] = useState(0); // State cho walletAC
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [telegramId, setTelegramId] = useState(null);
  const [followingAuthors, setFollowingAuthors] = useState([]);

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
      const cachedSignalData = sessionStorage.getItem("signalData");
      const cachedChannelData = sessionStorage.getItem("channelData");
      const cachedQuizData = sessionStorage.getItem("quizData");
      const cachedNewsData = sessionStorage.getItem("newsData");
      const cachedCourseData = sessionStorage.getItem("courseData");
      const cachedCharityData = sessionStorage.getItem("charityData");
      const cachedGiftData = sessionStorage.getItem("giftData");
      const cachedUserData = sessionStorage.getItem("userData");

      if (
        cachedSignalData &&
        cachedChannelData &&
        cachedQuizData &&
        cachedNewsData &&
        cachedCourseData &&
        cachedCharityData &&
        cachedGiftData &&
        cachedUserData
      ) {
        setSignalData(JSON.parse(cachedSignalData));
        setChannelData(JSON.parse(cachedChannelData));
        setQuizData(JSON.parse(cachedQuizData));
        setNewsData(JSON.parse(cachedNewsData));
        setCourseData(JSON.parse(cachedCourseData));
        setUserData(JSON.parse(cachedUserData));
        setCharityData(JSON.parse(cachedCharityData));
        setGiftData(JSON.parse(cachedGiftData));
        setIsLoading(false);
      } else {
        const preload = await preloadData(apiKey, telegramId);
        setSignalData(preload.signalData);
        setChannelData(preload.channelData);
        setQuizData(preload.quizData);
        setNewsData(preload.newsData);
        setCourseData(preload.courseData);
        setCharityData(preload.charityData);
        setGiftData(preload.giftData);
        setUserData(preload.userData);

        // Lưu vào sessionStorage
        sessionStorage.setItem("signalData", JSON.stringify(preload.signalData));
        sessionStorage.setItem("channelData", JSON.stringify(preload.channelData));
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

  // Lấy danh sách followingAuthors từ activeAccount
  useEffect(() => {
    if (userData) {
      const activeAccount = userData.trading_accounts?.find(account => account.status === 1);
      const followingAuthors = activeAccount?.following_channels?.map(channel => channel.author) || [];
      setFollowingAuthors(followingAuthors);
    }
  }, [userData]);

  // Cập nhật walletAC từ sessionStorage khi Home load
  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("userData")) || {};
    setUserData(storedUserData);
  }, []);

    useEffect(() => {
      window.updateFollowingAuthors = (author) => {
        setFollowingAuthors((prevAuthors) => [...prevAuthors, author]);
      };
    }, []);

  return (
    <div className="home">
      {isLoading && <Loading />}
      <Header userId={userData?.userID} />
      <div className="rectangle-container">
        <div className="home-circle">
          <img src={avatar} alt="Gift Icon" />
        </div>
        <div className="rectangle">
          <div className="rectangle-text">{announText}</div>
        </div>
      </div>
      <main className="content-wrapper">
        <h2 className="title">Featured Channels</h2>
        {channelData.length === 0 ? (
          <Loading />
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
          >
            {channelData.map((item) => {
              const isFollowing = followingAuthors.includes(item.author);
              const status = isFollowing ? 1 : 0;
              return (
                <SwiperSlide key={item.id}>
                  <Channel
                    author={item.author}
                    avatar={item.avatar}
                    description={item.description}
                    profitRank={item.profitRank}
                    totalSignals={item.totalSignals}
                    totalPips={item.totalPips}
                    status={status}
                    price={item.price}
                    onReportClick={status === 0 ? () => handleReportClick(item.author, item.price) : undefined}
                    updateFollowingAuthors={window.updateFollowingAuthors}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="dynamic-content">
          <h2 className="title">Latest Signals</h2>
        </div>
        {signalData.length === 0 ? (
          <Loading />
        ) : (
          <div>
            {signalData
              .filter((item) => item.done_at === null)
              .map((item) => {
                const isFollowing = followingAuthors.includes(item.author);
                const status = isFollowing ? 1 : 0;
                return (
                  <div key={item.id}>
                    <Signal
                      avatar={item.avatar}
                      TP1={item.tpSigPrice1}
                      TP2={item.tpSigPrice2}
                      TP3={item.tpSigPrice3}
                      E1={item.eSigPrice}
                      SL={item.slSigPrice1}
                      margin={item.symbol}
                      command={item.isBuy}
                      result={item.R_result}
                      author={item.author}
                      status={status}
                      created_at={formatDate(item.created_at)}
                      done_at={null}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;