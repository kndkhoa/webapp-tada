import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Signal from "../components/Signal";
import Channel from "../components/Channel";
import Footer from "../components/Footer";
import Report from "../components/Report"; // Import component Report
import BuyAC from "../components/BuyAC";
import "./KhoTang.css";
import "./Earn.css";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Xử lý trường hợp dateString là null hoặc undefined

  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${hours}:${minutes} - ${day}/${month}`;
};

function Earn() {
  const [activeTab, setActiveTab] = useState("signal");
  const [activeCatalogue, setActiveCatalogue] = useState("All");
  const [dataType, setDataType] = useState("Signals");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showBuyAC, setShowBuyAC] = useState(false);
  const [reportAuthor, setReportAuthor] = useState(null);
  const [reportPrice, setReportPrice] = useState(null);
  const [reportWalletAC, setReportWalletAC] = useState(null);
  const [reportuserID, setReportuserID] = useState(null);
  const [reportactiveAccount, setReportActiveAccount] = useState(null);
  const [followingAuthors, setFollowingAuthors] = useState([]);

  const navigate = useNavigate();
  const [direction, setDirection] = useState(1);

  const handleReportClick = (author, price) => {
    if (!userData) {
      console.error("userData chưa được tải!");
      return;
    }
    const activeAccount = userData?.trading_accounts?.find(account => account.status === 1);

    setReportAuthor(author);
    setReportPrice(price);
    setReportWalletAC(userData.wallet_AC);
    setReportuserID(userData.userID);
    setShowReport(true);
    if (activeAccount) {
      setReportActiveAccount(activeAccount.accountMT5);
    }
  };

  const handleItemClick = (Id, userId) => {
    navigate(`/${dataType}/${Id}`, { state: { userId } });
  };

  useEffect(() => {
    const cachedUserData = sessionStorage.getItem("userData");
    const cachedSignalData = sessionStorage.getItem("signalData");
    const cachedChannelData = sessionStorage.getItem("channelData");

    if (cachedUserData) {
      const userData = JSON.parse(cachedUserData);
      setUserData(userData);
    
      // ✅ Lấy danh sách following_channels từ tài khoản đang hoạt động (status === 1)
      const activeAccount = userData.trading_accounts?.find(account => account.status === 1);
      const followingAuthors = activeAccount?.following_channels?.map(channel => channel.author) || [];

      setFollowingAuthors(followingAuthors);
    } else {
      console.error("No user data found in sessionStorage!");
      return;
    }
    

    let data = [];
    if (dataType === "Signals" || dataType === "Results") {
      data = JSON.parse(cachedSignalData || "[]");
    } else if (dataType === "Channels") {
      data = JSON.parse(cachedChannelData || "[]");
    }

    const normalizedData = data.map((item) => ({
      ...item,
      done_at: item.done_at === "0000-00-00 00:00:00" ? null : item.done_at,
    }));

    setAllData(normalizedData);
    setLoading(false);
  }, [dataType]);

  useEffect(() => {
    window.updateFollowingAuthors = (author) => {
      setFollowingAuthors((prevAuthors) => [...prevAuthors, author]);
    };
  }, []);

  const signalStatusMap = useMemo(
    () => new Map(userData?.news_reads?.map((read) => [read.news_id, true])),
    [userData]
  );

  const filteredData = allData.filter((item) => {
    const isMatchingType =
      dataType === "All" || item.dataType === "Signals" || item.dataType === "Channels";
    const isMatchingCatalogue =
      activeCatalogue === "All" || item.catalogues === activeCatalogue;

    if (activeTab === "results") {
      return isMatchingType && isMatchingCatalogue && item.done_at !== null;
    } else if (activeTab === "signal") {
      return isMatchingType && isMatchingCatalogue && item.done_at === null;
    }
    return isMatchingType && isMatchingCatalogue;
  });

  const handleTabClick = (tab, type) => {
    setDirection(type === "Signals" ? 1 : -1);
    setActiveTab(tab);
    setDataType(type);
    setActiveCatalogue("All");
  };

  const handleCatalogueClick = (catalogue) => {
    setActiveCatalogue(catalogue);
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
            className={`btn_signal ${activeTab === "signal" ? "active" : ""}`}
            onClick={() => handleTabClick("signal", "Signals")}
          >
            Live signals
          </button>
          <button
            className={`btn_results ${activeTab === "results" ? "active" : ""}`}
            onClick={() => handleTabClick("results", "Results")}
          >
            Results
          </button>
          <button
            className={`btn_channel ${activeTab === "channel" ? "active" : ""}`}
            onClick={() => handleTabClick("channel", "Channels")}
          >
            Channels
          </button>
        </div>

        {/* Nhóm nút lọc */}
        <div className="filter-buttons">
          <button
            className={`filter-button ${activeCatalogue === "All" ? "active" : ""}`}
            onClick={() => handleCatalogueClick("All")}
          >
            All
          </button>
          <button
            className={`filter-button ${activeCatalogue === "Crypto" ? "active" : ""}`}
            onClick={() => handleCatalogueClick("Crypto")}
          >
            Crypto
          </button>
          <button
            className={`filter-button ${activeCatalogue === "Forex" ? "active" : ""}`}
            onClick={() => handleCatalogueClick("Forex")}
          >
            Forex
          </button>
          <button
            className={`filter-button ${activeCatalogue === "Stock" ? "active" : ""}`}
            onClick={() => handleCatalogueClick("Stock")}
          >
            Stock
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
                filteredData.map((item) => {
                  if (item.dataType === "Signals") {
                    return (
                      <Signal
                        avatar={item.avatar}
                        TP1={item.TP1}
                        TP2={item.TP2}
                        TP3={item.TP3}
                        E1={item.E1}
                        E2={item.E2}
                        E3={item.E3}
                        SL={item.SL}
                        margin={item.margin}
                        command={item.command}
                        result={item.result}
                        author={item.author}
                        created_at={formatDate(item.created_at)}
                        done_at={item.done_at ? formatDate(item.done_at) : null}
                      />
                    );
                  } else if (item.dataType === "Channels") {
                    const isFollowing = followingAuthors.includes(item.author);
                    const status = isFollowing ? 1 : 0;
                    console.log("danh sách author"+ followingAuthors);
                    console.log("status channel = " + status + item.author);
                    return (
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
                    );
                  }
                  return null;
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {showReport && !showBuyAC && (
  <div className="report-modal">
    <Report
      author={reportAuthor}
      price={reportPrice}
      walletAC={reportWalletAC}
      userID={reportuserID}
      activeAccount={reportactiveAccount}
      onClose={() => setShowReport(false)}
      onBuyAC={() => {
        setShowReport(false); // Ẩn Report
        setShowBuyAC(true);   // Hiển thị BuyAC
      }}
    />
  </div>
)}

{showBuyAC && (
  <div className="report-modal">
    <BuyAC 
      userID={reportuserID} 
      walletAC={reportWalletAC} 
      onClose={() => setShowBuyAC(false)}
    />
  </div>
)}

      </main>
      <Footer />
    </div>
  );
}

export default Earn;
