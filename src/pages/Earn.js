import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Signal from "../components/Signal";
import Channel from "../components/Channel";
import Footer from "../components/Footer";
import Report from "../components/Report";
import BuyAC from "../components/BuyAC";
import { ReloadSkeleton } from "../components/waiting";
import "./KhoTang.css";
import "./Earn.css";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Kiểm tra nếu date không hợp lệ
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

  useEffect(() => {
    const cachedUserData = sessionStorage.getItem("userData");
    const cachedSignalData = sessionStorage.getItem("signalData");
    const cachedChannelData = sessionStorage.getItem("channelData");

    if (!cachedUserData) {
      console.error("No user data in sessionStorage!");
      setLoading(false);
      return;
    }

    let parsedUserData;
    try {
      parsedUserData = JSON.parse(cachedUserData);
    } catch (error) {
      console.error("Error parsing userData:", error);
      setLoading(false);
      return;
    }

    setUserData(parsedUserData);

    const activeAccount = parsedUserData?.trading_accounts?.find(account => account.status === 1) || {};
    const followingAuthors = activeAccount.following_channels?.map(channel => channel.author) || [];
    const autoCopyMapping = {};
    activeAccount.following_channels?.forEach(channel => {
      if (channel.author) autoCopyMapping[channel.author] = channel.autoCopy ?? 0;
    });
    const freeTradingSignals = activeAccount.freetrading?.map(ft => ft.signalID) || [];

    setFollowingAuthors(followingAuthors);
    setAutoCopyData(autoCopyMapping);
    setFreeTradingList(freeTradingSignals);
    setApikeyBot(activeAccount.apikeyBot || "");
    setAccountMT5(activeAccount.accountMT5 || "");
    setGroupID(activeAccount.telegramgroup_id || 0);

    let data = [];
    try {
      data = dataType === "Channels" 
        ? JSON.parse(cachedChannelData || "[]") 
        : JSON.parse(cachedSignalData || "[]");
    } catch (error) {
      console.error(`Error parsing ${dataType} data:`, error);
    }

    const normalizedData = data.map(item => ({
      ...item,
      done_at: item.done_at === "0000-00-00 00:00:00" || !item.done_at ? null : item.done_at,
      dataType: item.dataType || dataType, // Đảm bảo dataType luôn có giá trị
      author: item.author || "", // Đảm bảo author không bị undefined
    }));

    setAllData(normalizedData);
    setLoading(false);
  }, [dataType]);

  const filteredData = useMemo(() => {
    return allData.filter(item => {
      const isMatchingType = dataType === "All" || item.dataType === dataType;
      const isMatchingCatalogue = activeCatalogue === "All" || item.catalogues === activeCatalogue;
      if (activeTab === "results") {
        return isMatchingType && isMatchingCatalogue && item.done_at !== null;
      } else if (activeTab === "signal") {
        return isMatchingType && isMatchingCatalogue && item.done_at === null;
      }
      return isMatchingType && isMatchingCatalogue;
    });
  }, [allData, activeTab, activeCatalogue, dataType]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setDataType(tab === "channel" ? "Channels" : "Signals");
  };

  const handleReportClick = (author, price) => {
    if (!userData) return;
    const activeAccount = userData?.trading_accounts?.find(account => account.status === 1) || {};
    setReportAuthor(author || "");
    setReportPrice(price || 0);
    setReportWalletAC(userData.wallet_AC || 0);
    setReportuserID(userData.userID || "");
    setReportActiveAccount(activeAccount.accountMT5 || "");
    setShowReport(true);
  };

  if (loading) return <ReloadSkeleton />;
  if (!userData) return <p>No user data available. Please log in.</p>;

  return (
    <div className="App">
      <Header walletAC={userData.wallet_AC || 0} userId={userData.userID || ""} />
      <main>
        <div className="tab-menu">
          <button
            className={`btn_signal ${activeTab === "signal" ? "active" : ""}`}
            onClick={() => handleTabClick("signal")}
          >
            Live signals
          </button>
          <button
            className={`btn_results ${activeTab === "results" ? "active" : ""}`}
            onClick={() => handleTabClick("results")}
          >
            Results
          </button>
          <button
            className={`btn_channel ${activeTab === "channel" ? "active" : ""}`}
            onClick={() => handleTabClick("channel")}
          >
            Channels
          </button>
        </div>

        <div className="filter-buttons">
          {["All", "Crypto", "Forex", "Stock"].map(catalogue => (
            <button
              key={catalogue}
              className={`filter-button ${activeCatalogue === catalogue ? "active" : ""}`}
              onClick={() => setActiveCatalogue(catalogue)}
            >
              {catalogue}
            </button>
          ))}
        </div>

        <div className="content-container">
          {filteredData.length === 0 ? (
            <p>No data available for this selection.</p>
          ) : (
            filteredData.map((item, index) => (
              item.dataType === "Signals" ? (
                <Signal
                  key={item.signalID || index}
                  avatar={item.avatar || ""}
                  TP1={item.tpSigPrice1 || ""}
                  TP2={item.tpSigPrice2 || ""}
                  TP3={item.tpSigPrice3 || ""}
                  E1={item.eSigPrice || ""}
                  SL={item.slSigPrice1 || ""}
                  margin={item.symbol || ""}
                  command={item.isBuy || ""}
                  result={item.R_result || ""}
                  apikeyBot={apikeyBot}
                  accountMT5={accountMT5}
                  freetrading={freeTradingList.includes(item.signalID) ? 1 : 0}
                  groupId={groupId}
                  author={item.author || ""}
                  signalID={item.signalID || ""}
                  userID={userData.userID || ""}
                  status={followingAuthors.includes(item.author) ? 1 : 0}
                  autoCopy={autoCopyData[item.author] ?? 0}
                  created_at={formatDate(item.created_at)}
                  done_at={item.done_at ? formatDate(item.done_at) : null}
                />
              ) : (
                <Channel
                  key={item.author || index}
                  author={item.author || ""}
                  avatar={item.avatar || ""}
                  description={item.description || ""}
                  profitRank={item.wpr || 0}
                  totalSignals={item.totalSignals || 0}
                  totalPips={item.totalResult || 0}
                  status={followingAuthors.includes(item.author) ? 1 : 0}
                  price={item.price || 0}
                  onReportClick={
                    !followingAuthors.includes(item.author)
                      ? () => handleReportClick(item.author, item.price)
                      : undefined
                  }
                />
              )
            ))
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
                setShowReport(false);
                setShowBuyAC(true);
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
