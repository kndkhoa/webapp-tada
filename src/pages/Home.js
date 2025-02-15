import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import News from "../components/News";
import Channel from "../components/Channel";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Home.css";
import avatar from "../components/assets/avatar.gif";
import Loading from "../components/loading";
import { preloadData } from "./api"; // Import từ file API
import { sendTelegramMessage } from "../components/TelegramNotification";

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
  const [newsData, setNewsData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [signalData, setSignalData] = useState([]);
  const [quizData, setQuizData] = useState([]);
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
  const checkTelegramData = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      // Báo cho Telegram biết rằng Web App đã sẵn sàng
      window.Telegram.WebApp.ready();

      // Sử dụng initData thay vì initDataUnsafe
      const telegramData = window.Telegram.WebApp.initDataUnsafe?.user;
      sendTelegramMessage("Coi thử có telegramData không? Kết quả là: " + telegramData); // Log dữ liệu để kiểm tra

      if (telegramData && telegramData.user) {
        const telegramId = telegramData.user.id;
        sendTelegramMessage("Usr ID là " + telegramId);
        setTelegramId(telegramId || 9999); // Nếu không có id, dùng giá trị mặc định
      } else {
        sendTelegramMessage("Không tìm thấy user data từ Telegram Web App.");
        setTelegramId(9999); // Nếu không có dữ liệu từ Web App, đặt giá trị mặc định
      }
    } else {
      sendTelegramMessage("Không phải trong Telegram Web App.");
      const queryParams = new URLSearchParams(window.location.search);
      const telegramIdFromUrl = queryParams.get("telegramId");
      setTelegramId(telegramIdFromUrl || 9999); // Nếu không có telegramId từ URL, dùng giá trị mặc định
    }
  };

  checkTelegramData();
}, []);


  // Lấy dữ liệu từ API
  useEffect(() => {
  if (!telegramId) return; // Chỉ fetch dữ liệu khi có telegramId

  const fetchData = async () => {
    const cachedNewsData = sessionStorage.getItem("newsData");
    const cachedChannelData = sessionStorage.getItem("channelData");
    const cachedQuizData = sessionStorage.getItem("quizData");
    const cachedCourseData = sessionStorage.getItem("courseData");
    const cachedCharityData = sessionStorage.getItem("charityData");
    const cachedGiftData = sessionStorage.getItem("giftData");
    const cachedUserData = sessionStorage.getItem("userData");
    const cachedSignalData = sessionStorage.getItem("signalData");

    if (
      cachedNewsData &&
      cachedChannelData &&
      cachedQuizData &&
      cachedCourseData &&
      cachedCharityData &&
      cachedGiftData &&
      cachedSignalData &&
      cachedUserData
    ) {
      setNewsData(JSON.parse(cachedNewsData));
      setChannelData(JSON.parse(cachedChannelData));
      setSignalData(JSON.parse(cachedSignalData));
      setQuizData(JSON.parse(cachedQuizData));
      setCourseData(JSON.parse(cachedCourseData));
      setUserData(JSON.parse(cachedUserData));
      setCharityData(JSON.parse(cachedCharityData));
      setGiftData(JSON.parse(cachedGiftData));
      setIsLoading(false);
    } else {
      const preload = await preloadData(apiKey, telegramId); // Sử dụng telegramId từ URL
      setNewsData(preload.newsData);
      setChannelData(preload.channelData);
      setSignalData(preload.signalData);
      setQuizData(preload.quizData);
      setCourseData(preload.courseData);
      setCharityData(preload.charityData);
      setGiftData(preload.giftData);
      setUserData(preload.userData);

      // Lưu vào sessionStorage
      sessionStorage.setItem("newsData", JSON.stringify(preload.newsData));
      sessionStorage.setItem("channelData", JSON.stringify(preload.channelData));
      sessionStorage.setItem("signalData", JSON.stringify(preload.signalData));
      sessionStorage.setItem("quizData", JSON.stringify(preload.quizData));
      sessionStorage.setItem("courseData", JSON.stringify(preload.courseData));
      sessionStorage.setItem("userData", JSON.stringify(preload.userData));
      sessionStorage.setItem("charityData", JSON.stringify(preload.charityData));
      sessionStorage.setItem("giftData", JSON.stringify(preload.giftData));
      setIsLoading(false);
    }
  };

  fetchData();
}, [telegramId, apiKey]); // Thêm telegramId vào dependency array

  // Lấy danh sách followingAuthors từ activeAccount
  useEffect(() => {
    if (userData) {
      const activeAccount = userData.trading_accounts?.find(account => account.status === 1);
      const followingAuthors = activeAccount?.following_channels?.map(channel => channel.author) || [];
      setFollowingAuthors(followingAuthors);
      setWalletAC(userData.wallet_AC || 0);
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

  const newsStatusMap = useMemo(
    () => new Map(userData?.news_reads?.map((read) => [read.news_id, true])),
    [userData]
  );

  // Hàm xử lý khi nhấn vào một bản tin
  const handleItemClick = (newsId) => {
    navigate(`/Tin tức/${newsId}`, { state: { userId: userData?.userID } });
  };

  return (
    <div className="home">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
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
              <h2 className="title">Latest News</h2>
            </div>
            {newsData.length === 0 ? (
              <Loading />
            ) : (
              <div>
                {newsData
                  .filter((item) => item.dataType === "Tin tức")
                  .map((item) => (
                    <div key={item.id} onClick={() => handleItemClick(item.id)}>
                      <News
                        title={item.title}
                        description={item.description}
                        banner={item.banner}
                        heartValue={item.heart}
                        commentValue={item.comment}
                        ac={item.ac}
                        author={item.author}
                        created_at={formatDate(item.created_at)}
                        status={newsStatusMap.has(item.id) ? 0 : 1}
                      />
                    </div>
                  ))}
              </div>
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
