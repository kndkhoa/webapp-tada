import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import News from "../components/News";
import TadaTV from "../components/TadaTV";
import Course from "../components/Course";
import Footer from "../components/Footer";
import "./KhoTang.css";

function KhoTang() {
  const [activeTab, setActiveTab] = useState("tintuc"); // Tab hiện tại
  const [activeCatalogue, setActiveCatalogue] = useState("All"); // Loại tin tức (Crypto, Forex,...)
  const [dataType, setDataType] = useState("Tin tức"); // Kiểu dữ liệu (Tin tức, TadaTV, Courses)
  const [allData, setAllData] = useState([]); // Dữ liệu API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const [direction, setDirection] = useState(1); // Hướng trượt

  const handleItemClick = (Id, userId) => {
    navigate(`/${dataType}/${Id}`, { state: { userId } });
  };

  // Lấy dữ liệu từ sessionStorage
  useEffect(() => {
    const cachedUserData = sessionStorage.getItem("userData");
    const cachedNewsData = sessionStorage.getItem("newsData");
    const cachedCourseData = sessionStorage.getItem("courseData");

    if (cachedUserData) {
      setUserData(JSON.parse(cachedUserData));
    } else {
      console.error("No user data found in sessionStorage!");
      return;
    }

    let data = [];
    if (dataType === "Tin tức") {
      data = JSON.parse(cachedNewsData || "[]");
    } else if (dataType === "TadaTV") {
      data = JSON.parse(cachedNewsData || "[]").filter(item => item.dataType === "TadaTV");
    } else if (dataType === "Courses") {
      data = JSON.parse(cachedCourseData || "[]");
    }

    setAllData(data);
    setLoading(false);
  }, [dataType]);

  const newsStatusMap = useMemo(
    () => new Map(userData?.news_reads?.map((read) => [read.news_id, true])),
    [userData]
  );

  // Lọc dữ liệu hiển thị theo dataType và catalogue
  const filteredData = allData.filter(item =>
    (dataType === "All" || item.dataType === dataType) &&
    (activeCatalogue === "All" || item.catalogues === activeCatalogue)
  );

  // Đổi tab (news, tadatv, course)
  const handleTabClick = (tab, type) => {
    setDirection(type === "Tin tức" ? 1 : -1); // Xác định hướng trượt
    setActiveTab(tab);
    setDataType(type); // "Tin tức", "TadaTV", hoặc "Courses"
    setActiveCatalogue("All"); // Reset catalogue khi đổi tab
  };

  const tabVariants = {
    initial: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      position: "absolute",
    }),
    animate: {
      x: 0,
      position: "relative",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      position: "absolute",
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  if (!userData) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="App">
      <Header walletAC={userData.wallet_AC} userId={userData.userID} />
      <main>
        {/* Tab Menu */}
        <div className="tab-menu">
          <button
            className={`btn_tintuc ${activeTab === "tintuc" ? "active" : ""}`}
            onClick={() => handleTabClick("tintuc", "Tin tức")}
          >
            Tin tức
          </button>
          <button
            className={`btn_tadatv ${activeTab === "tadatv" ? "active" : ""}`}
            onClick={() => handleTabClick("tadatv", "TadaTV")}
          >
            TadaTV
          </button>
          <button
            className={`btn_khoahoc ${activeTab === "khoahoc" ? "active" : ""}`}
            onClick={() => handleTabClick("khoahoc", "Courses")}
          >
            Khóa học
          </button>
        </div>

        {/* Nội dung thay đổi theo tab */}
        <div className="content-container">
          <AnimatePresence exitBeforeEnter custom={direction}>
            <motion.div
              key={activeTab} // Mỗi tab có một key khác nhau
              custom={direction}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="tab-content"
            >
              {loading ? (
                <p>Loading...</p>
              ) : (
                filteredData.map(item => {
                  if (item.dataType === "Tin tức") {
                    return (
                      <div key={item.id} onClick={() => handleItemClick(item.id)}>
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
                    );
                  } else if (item.dataType === "TadaTV") {
                    return (
                      <div key={item.id} onClick={() => handleItemClick(item.id)}>
                        <TadaTV
                          title={item.title}
                          description={item.description}
                          pic={item.banner}
                          heartValue={item.heart}
                          commentValue={item.comment}
                          clip={item.clip}
                          ac={item.ac}
                          name={item.author}
                          time={item.created_at}
                          status={newsStatusMap.has(item.id) ? 0 : 1}
                        />
                      </div>
                    );
                  } else if (item.dataType === "Courses") {
                    return (
                      <div key={item.id} onClick={() => handleItemClick(item.id)}>
                        <Course
                          title={item.title}
                          description={item.description}
                          banner={item.banner}
                          ac={item.ac}
                          completion={item.completion}
                          status={1}
                        />
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default KhoTang;
