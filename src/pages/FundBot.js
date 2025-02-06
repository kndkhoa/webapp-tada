import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import IncomeChart from "../components/Income-Chart";
import Balance from "../components/Balance";
import TradingAnalysis from "../components/Trading-Analysis";
import Strategy from "../components/Controller-Strategy";
import ControllerMore from "../components/Controller-More";
import ControllerAccount from "../components/Controller-Account";
import Footer from "../components/Footer";
import "./KhoTang.css";

function FundBot() {
  const [activeTab, setActiveTab] = useState("portfolio"); // Tab hiện tại
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const navigate = useNavigate();
  const [direction, setDirection] = useState(1); // Hướng trượt

  // Lấy dữ liệu từ sessionStorage
  useEffect(() => {
    const cachedUserData = sessionStorage.getItem("userData");

    if (cachedUserData) {
      const parsedData = JSON.parse(cachedUserData);

      // Đảm bảo `trading_accounts` luôn có giá trị
      if (!parsedData.trading_accounts) {
        parsedData.trading_accounts = [];
      }

      setUserData(parsedData);
    } else {
      console.error("No user data found in sessionStorage!");
      setUserData({ trading_accounts: [] }); // Đảm bảo không bị undefined
    }

    setLoading(false);
  }, []);

  // Hàm cập nhật userData
  const handleUserDataUpdate = (updatedAccounts) => {
    setUserData((prevData) => {
      if (!prevData || !Array.isArray(prevData.trading_accounts)) return prevData;

      const newUserData = {
        ...prevData,
        trading_accounts: Array.isArray(updatedAccounts) ? updatedAccounts : [], // Đảm bảo updatedAccounts là một mảng
      };

      console.log("Updating sessionStorage with:", newUserData);
      sessionStorage.setItem("userData", JSON.stringify(newUserData)); // Cập nhật sessionStorage
      return newUserData;
    });
  };

  // Đổi tab (portfolio, controller)
  const handleTabClick = (tab) => {
    setDirection(tab === "portfolio" ? 1 : -1); // Xác định hướng trượt
    setActiveTab(tab);
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

  // Tìm tài khoản có status = 1
  const activeAccount = userData?.trading_accounts?.find(
    (account) => account.status === 1
  );

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
            className={`btn_portfolio ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => handleTabClick("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={`btn_controller ${activeTab === "controller" ? "active" : ""}`}
            onClick={() => handleTabClick("controller")}
          >
            Controller
          </button>
          <button
            className={`btn_account ${activeTab === "account" ? "active" : ""}`}
            onClick={() => handleTabClick("account")}
          >
            Account
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
                <>
                  {activeTab === "portfolio" && (
                    <div>
                      <IncomeChart 
                        trading_accounts={userData.trading_accounts}
                        accountMT5={activeAccount?.accountMT5 || ""}
                        />
                      <Balance 
                        trading_accounts={userData.trading_accounts}
                        accountMT5={activeAccount?.accountMT5 || ""} 
                      />
                      <TradingAnalysis 
                        trading_accounts={userData.trading_accounts}
                        accountMT5={activeAccount?.accountMT5 || ""} 
                      />
                    </div>
                  )}
                  {activeTab === "controller" && (
                    <div>
                      <Strategy
                        userID={userData.userID}
                        accountMT5={activeAccount?.accountMT5 || ""} // Truyền accountMT5 có status = 1
                        trading_accounts={userData.trading_accounts}
                        onUserDataUpdate={handleUserDataUpdate} // Truyền hàm callback
                      />
                      <ControllerMore
                        userID={userData.userID}
                        accountMT5={activeAccount?.accountMT5 || ""} // Truyền accountMT5 có status = 1
                        onUserDataUpdate={handleUserDataUpdate} // Truyền hàm callback
                      />
                    </div>
                  )}
                  {activeTab === "account" && (
                    <div>
                      {userData.trading_accounts.length > 0 ? (
                        userData.trading_accounts.map((account, index) => (
                          <ControllerAccount
                            index={index}
                            userID={userData.userID}
                            accountMT5={account.accountMT5} // Truyền đúng accountMT5 vào mỗi component
                            trading_accounts={userData.trading_accounts}
                            onUserDataUpdate={handleUserDataUpdate} // Truyền hàm callback
                          />
                        ))
                      ) : (
                        <p>Không có tài khoản giao dịch nào.</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FundBot;