import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import Footer from "../components/Footer";
import { preloadData } from "./api";
import "./DauTruong.css";

function DauTruong() {
  const [activeTab, setActiveTab] = useState("Đấu AC");
  const [quizData, setQuizData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiKey = "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE";

  useEffect(() => {
    const fetchData = async () => {
      const cachedQuizData = sessionStorage.getItem("quizData");
      const cachedUserData = sessionStorage.getItem("userData");

      if (cachedQuizData && cachedUserData) {
        setQuizData(JSON.parse(cachedQuizData));
        setUserData(JSON.parse(cachedUserData));
        setLoading(false);
      } else {
        try {
          const preload = await preloadData(apiKey, 9999);
          setQuizData(preload.quizData);
          setUserData(preload.userData);

          sessionStorage.setItem("quizData", JSON.stringify(preload.quizData));
          sessionStorage.setItem("userData", JSON.stringify(preload.userData));
        } catch (err) {
          setError("Failed to load data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [apiKey]);

  const quizStatusMap = useMemo(
    () => new Map(userData?.quiz_rank?.map((done) => [done.quizID, true]) || []),
    [userData]
  );

  const filteredQuizzes = quizData.filter((quiz) => quiz.dataType === activeTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNewsClick = (id, dataType) => {
    navigate(`/quiz/${id}?dataType=${dataType}`);
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Lỗi: {error}</p>;
  }

  const tabVariants = {
    initial: (direction) => ({
      x: direction > 0 ? "100%" : "-100%", // Tab mới bắt đầu ngoài màn hình
      position: "absolute", // Đảm bảo tab nằm đè lên tab cũ
    }),
    animate: {
      x: 0, // Tab mới trượt vào vị trí trung tâm
      position: "relative", // Đưa tab mới về vị trí bình thường sau khi chuyển đổi
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%", // Tab cũ trượt ra khỏi màn hình
      position: "absolute", // Đảm bảo tab cũ không ảnh hưởng tab mới
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const direction = activeTab === "Đấu AC" ? 1 : -1;

  return (
    <div className="App">
      <Header walletAC={userData.wallet_AC} userId={userData.userID} />
      <main>
        <div className="tab-menu">
          <button
            className={`btn_dauac ${activeTab === "Đấu AC" ? "active" : ""}`}
            onClick={() => handleTabClick("Đấu AC")}
          >
            Đấu AC
          </button>
          <button
            className={`btn_dauusdt ${activeTab === "Đấu USDT" ? "active" : ""}`}
            onClick={() => handleTabClick("Đấu USDT")}
          >
            Đấu USDT
          </button>
        </div>

        <div className="quiz-content">
          <AnimatePresence exitBeforeEnter custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="quiz-list"
            >
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  onClick={() => handleNewsClick(quiz.id, quiz.dataType)}
                >
                  <QuizCard
                    title={quiz.title}
                    description={quiz.description}
                    pic={quiz.banner}
                    prizeValue={quiz.prizeValue}
                    done_at={quiz.done_at}
                    topCompleters={quiz.topCompleters}
                    members={quiz.totalParticipants}
                    status={quizStatusMap.has(quiz.id) ? 0 : 1}
                    gift_title={quiz.gift_title}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DauTruong;
