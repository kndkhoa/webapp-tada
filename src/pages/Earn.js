import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Signal from "../components/Signal";
import Channel from "../components/Channel";
import Footer from "../components/Footer";
import Report from "../components/Report";
import BuyAC from "../components/BuyAC";
import { ReloadSkeleton, PreloadImage } from "../components/waiting";
import "./KhoTang.css";
import "./Earn.css";
import { preloadData } from "./api";

const formatDate = (dateString) => {
  if (!dateString) return "";
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
  const [page, setPage] = useState(1);
  const [signalHasMore, setSignalHasMore] = useState(true);
  const [channelHasMore, setChannelHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const navigate = useNavigate();
  const [direction, setDirection] = useState(1);
  const observer = useRef();
  const lastScrollTop = useRef(0);

  // Xử lý cuộn toàn cục
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      setIsFooterVisible(scrollTop <= lastScrollTop.current);
      lastScrollTop.current = scrollTop;

      if (scrollTop + clientHeight >= scrollHeight - 200 && !isFetching) {
        if (dataType === "Signals" && signalHasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchMoreSignals(nextPage);
            return nextPage;
          });
        } else if (dataType === "Channels" && channelHasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchMoreChannels(nextPage);
            return nextPage;
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [signalHasMore, channelHasMore, isFetching, dataType]);

  const handleReportClick = (author, price) => {
    if (!userData) {
      console.error("userData chưa được tải!");
      return;
    }
    const activeAccount = userData?.trading_accounts?.find((account) => account.status === 1);
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

  const fetchMoreSignals = async (pageToFetch) => {
    if (!signalHasMore || isFetching) return;
    setIsFetching(true);

    if (!userData || !userData.userID) {
      console.error("userData is null or missing userID");
      setIsFetching(false);
      return;
    }

    const apiKey = "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE";
    try {
      const newData = await preloadData(apiKey, userData.userID, pageToFetch, 10);
      const normalizedNewData = (newData.signalData || []).map((item) => ({
        ...item,
        done_at: item.done_at === "0000-00-00 00:00:00" ? null : item.done_at,
      }));
      setAllData((prevData) => [...prevData, ...normalizedNewData]);
      setSignalHasMore(newData.signalHasMore);
      sessionStorage.setItem("signalData", JSON.stringify([...allData, ...normalizedNewData]));
    } catch (error) {
      console.error("Error fetching more signals:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchMoreChannels = async (pageToFetch) => {
    if (!channelHasMore || isFetching) return;
    setIsFetching(true);

    try {
      const response = await fetch(`http://your-api-endpoint/authors?page=${pageToFetch}&limit=10`, {
        headers: { "Content-Type": "application/json" },
      });
      const newData = await response.json();
      const normalizedNewData = (newData.data || []).map((item) => ({
        dataType: "Channels",
        author: item.author,
        avatar: item.avatar,
        description: item.description || "No description available.",
        wpr: item.wpr,
        totalSignals: item.totalSignals,
        totalResult: item.totalResult,
        price: item.price || 0,
      }));
      setAllData((prevData) => [...prevData, ...normalizedNewData]);
      setChannelHasMore(newData.meta.hasMore);
      sessionStorage.setItem("channelData", JSON.stringify([...allData, ...normalizedNewData]));
    } catch (error) {
      console.error("Error fetching more channels:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const lastSignalElementRef = useCallback(
    (node) => {
      if (isFetching || !node || !userData) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (dataType === "Signals" && signalHasMore) {
              setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchMoreSignals(nextPage);
                return nextPage;
              });
            } else if (dataType === "Channels" && channelHasMore) {
              setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchMoreChannels(nextPage);
                return nextPage;
              });
            }
          }
        },
        { threshold: 0.1 }
      );
      observer.current.observe(node);
    },
    [isFetching, signalHasMore, channelHasMore, userData, dataType]
  );

  // Tải dữ liệu ban đầu và reset khi chuyển tab
  useEffect(() => {
    const cachedUserData = sessionStorage.getItem("userData");
    const cachedSignalData = sessionStorage.getItem("signalData");
    const cachedChannelData = sessionStorage.getItem("channelData");

    if (cachedUserData) {
      const userData = JSON.parse(cachedUserData);
      setUserData(userData);

      const activeAccount = userData.trading_accounts?.find((account) => account.status === 1);
      const followingAuthors = activeAccount?.following_channels?.map((channel) => channel.author) || [];

      const autoCopyMapping = {};
      activeAccount.following_channels?.forEach((channel) => {
        autoCopyMapping[channel.author] = channel.autoCopy ?? 0;
      });

      const freeTradingSignals = activeAccount?.freetrading?.map((ft) => ft.signalID) || [];

      setFreeTradingList(freeTradingSignals);
      setFollowingAuthors(followingAuthors);
      setAutoCopyData(autoCopyMapping);
      setApikeyBot(activeAccount.apikeyBot || "");
      setAccountMT5(activeAccount.accountMT5 || "");
      setGroupID(activeAccount.telegramgroup_id || 0);
    }

    // Reset dữ liệu khi chuyển tab
    setAllData([]);
    setPage(1);
    setLoading(true);

    let data = [];
    if (dataType === "Signals" || dataType === "Results") {
      data = JSON.parse(cachedSignalData || "[]");
      setSignalHasMore(JSON.parse(sessionStorage.getItem("signalHasMore") || "true"));
      setChannelHasMore(true); // Reset channelHasMore khi không ở tab Channels
    } else if (dataType === "Channels") {
      data = JSON.parse(cachedChannelData || "[]");
      setChannelHasMore(JSON.parse(sessionStorage.getItem("channelHasMore") || "true"));
      setSignalHasMore(true); // Reset signalHasMore khi không ở tab Signals
    }

    const normalizedData = data.map((item) => ({
      ...item,
      done_at: item.done_at === "0000-00-00 00:00:00" ? null : item.done_at,
    }));
    const limitedData = normalizedData.slice(0, 10);
    setAllData(limitedData);
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
    const isMatchingType = item.dataType === dataType;
    const isMatchingCatalogue = activeCatalogue === "All" || item.catalogues === activeCatalogue;

    if (activeTab === "results") {
      return isMatchingType && isMatchingCatalogue && item.done_at !== null;
    } else if (activeTab === "signal") {
      return isMatchingType && isMatchingCatalogue && item.done_at === null;
    }
    return isMatchingType && isMatchingCatalogue;
  });

  const handleTabClick = (tab, direction) => {
    setDirection(direction);
    setActiveTab(tab);
    setDataType(tab === "channel" ? "Channels" : "Signals");
  };

  const handleCatalogueClick = (catalogue) => {
    setActiveCatalogue(catalogue);
  };

  if (!userData) {
    return <ReloadSkeleton />;
  }

  return (
    <div className="App">
      <Header walletAC={userData.wallet_AC} userId={userData.userID} />
      <main style={{ minHeight: "calc(100vh - 60px)" }}>
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

        <div className="content-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredData.map((item, index) => {
              const isLastElement = index === filteredData.length - 1;
              const isFollowing = followingAuthors.includes(item.author);
              const status = isFollowing ? 1 : 0;
              const autoCopy = autoCopyData[item.author] ?? 0;
              const freeTradingStatus = freeTradingList.includes(item.signalID) ? 1 : 0;
              if (item.dataType === "Signals") {
                return (
                  <Signal
                    key={item.signalID || `signal-${index}`}
                    ref={isLastElement ? lastSignalElementRef : null}
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
                    onUpdateFreeTrading={handleUpdateFreeTrading}
                  />
                );
              } else if (item.dataType === "Channels") {
                return (
                  <Channel
                    key={item.author || `channel-${index}`}
                    ref={isLastElement ? lastSignalElementRef : null}
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
          {isFetching && (
            <div
              style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #3498db",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
          )}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
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
            <BuyAC userID={reportuserID} walletAC={reportWalletAC} onClose={() => setShowBuyAC(false)} />
          </div>
        )}
      </main>
      <Footer isVisible={isFooterVisible} />
    </div>
  );
}

export default Earn;
