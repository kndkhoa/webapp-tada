import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Signal from "../components/Signal";
import Channel from "../components/Channel";
import Footer from "../components/Footer";
import Report from "../components/Report"; // Import component Report
import BuyAC from "../components/BuyAC";
import { ReloadSkeleton, PreloadImage } from "../components/waiting";
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
  const [autoCopyData, setAutoCopyData] = useState({});
  const [apikeyBot, setApikeyBot] = useState("");
  const [accountMT5, setAccountMT5] = useState("");
  const [groupId, setGroupID] = useState({});
  const [freeTradingList, setFreeTradingList] = useState([]);
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

      const autoCopyMapping = {};
        activeAccount.following_channels?.forEach(channel => {
          autoCopyMapping[channel.author] = channel.autoCopy ?? 0; // Nếu không có autoCopy thì mặc định là 0
        });

      const freeTradingSignals = activeAccount?.freetrading?.map(ft => ft.signalID) || [];

      setFreeTradingList(freeTradingSignals);
      setFollowingAuthors(followingAuthors);
      setAutoCopyData(autoCopyMapping);
      setApikeyBot(activeAccount.apikeyBot || "");
      setAccountMT5(activeAccount.accountMT5 || "");
      setGroupID(activeAccount.telegramgroup_id || 0);
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

  const handleUpdateFreeTrading = (signalID) => {
    setFreeTradingList((prevList) => [...prevList, signalID]);
  };

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
  
  const handleTabClick = (tab, direction) => {
    setDirection(direction);  // Chỉ định hướng cho hiệu ứng
    setActiveTab(tab);         // Cập nhật tab hiện tại
    setDataType(tab === "channel" ? "Channels" : "Signals"); // Cập nhật dataType
  };

  if (!userData) {
    return <ReloadSkeleton />;
  }
 
  return (
    <div className="App">
      <Header walletAC={userData.wallet_AC} userId={userData.userID} />
      <main>
        {/* Tab Menu */}
        <div className="tab-menu">
          <button
            className={`btn_signal ${activeTab === "signal" ? "active" : ""}`}
            onClick={() => handleTabClick("signal", 1)}
          >
            Live signals
          </button>
          <button
            className={`btn_results ${activeTab === "results" ? "active" : ""}`}
            onClick={() => handleTabClick("results", -1)}
          >
            Results
          </button>
          <button
            className={`btn_channel ${activeTab === "channel" ? "active" : ""}`}
            onClick={() => handleTabClick("channel", 1)}
          >
            Channels
          </button>
        </div>
  
                {/* Nội dung thay đổi theo tab */}
                <div className="content-container">
              {loading ? (
                <p>Loading...</p>
              ) : (
                filteredData.map((item) => {
                  const isFollowing = followingAuthors.includes(item.author);
                  const status = isFollowing ? 1 : 0;
                  const autoCopy = autoCopyData[item.author] ?? 0;
                  const freeTradingStatus = freeTradingList.includes(item.signalID) ? 1 : 0;
                  if (item.dataType === "Signals") {
                    return (
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
                        apikeyBot={apikeyBot}
                        accountMT5={accountMT5}
                        freetrading={freeTradingStatus}
                        groupId={groupId}
                        author={item.author}
                        signalID={item.signalID}
                        userID={userData.userID}
                        status={status}
                        autoCopy={autoCopy}
                        R_result={item.R_result}                      
                        created_at={formatDate(item.created_at)}
                        done_at={item.done_at ? formatDate(item.done_at) : null}

                        onUpdateFreeTrading={handleUpdateFreeTrading} // Truyền callback xuống Signal
                      />
                    );
                  } else if (item.dataType === "Channels") {
                    return (
                      <Channel
                        author={item.author}
                        avatar={item.avatar}
                        description={item.description}
                        profitRank={item.wpr}
                        totalSignals={item.totalSignals}
                        totalPips={item.totalResult}
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
