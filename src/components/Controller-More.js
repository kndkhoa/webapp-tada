import React, { useState, useEffect } from "react";
import "./Signal.css";
import "./Controller-Strategy.css";
import controllermoreIcon from "./assets/icons/controller-more.png";

const ControllerMore = ({ userID, accountMT5, onUserDataUpdate }) => {
  const [isSLtoEntryOn, setIsSLtoEntryOn] = useState(false);
  const [isRevertSignalsOn, setIsRevertSignalsOn] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // 🔥 Hàm cập nhật state từ sessionStorage (Load dữ liệu mới nhất)
  const updateStateFromStorage = () => {
    const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));

    if (cachedUserData && Array.isArray(cachedUserData.trading_accounts)) {
      const currentAccount = cachedUserData.trading_accounts.find(
        (account) => account.accountMT5 === accountMT5
      );
      if (currentAccount) {
        setIsSLtoEntryOn(currentAccount.SLtoEntry === 1);
        setIsRevertSignalsOn(currentAccount.revertSignals === 1);
      }
    }
  };

  // 🔥 Khi component mount, lấy dữ liệu từ sessionStorage
  useEffect(() => {
    updateStateFromStorage();
  }, [accountMT5]);

  // 🔥 Hàm xử lý khi nhấn nút Save
  const handleSave = async () => {
    try {
      const payload = {
        userID: userID,
        accountMT5: accountMT5,
        SLtoEntry: isSLtoEntryOn ? 1 : 0,
        revertSignals: isRevertSignalsOn ? 1 : 0,
      };

      console.log("Payload gửi lên API:", payload);

      // Gọi API POST
      const response = await fetch("http://admin.tducoin.com/api/webappuser/tradingaccount", {
        method: "POST",
        headers: {
          "x-api-key": "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("API Error Response:", errorResponse);
        throw new Error(errorResponse.message || "Failed to save data");
      }

      const result = await response.json();
      console.log("API Response:", result);

      // 🔥 Cập nhật sessionStorage ngay sau khi API thành công
      const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));
      const updatedUserData = {
        ...cachedUserData,
        trading_accounts: cachedUserData.trading_accounts.map((account) =>
          account.accountMT5 === accountMT5
            ? {
                ...account,
                SLtoEntry: payload.SLtoEntry,
                revertSignals: payload.revertSignals,
              }
            : account
        ),
      };
      sessionStorage.setItem("userData", JSON.stringify(updatedUserData));

      // 🔥 Cập nhật UI ngay lập tức
      setIsSLtoEntryOn(payload.SLtoEntry === 1);
      setIsRevertSignalsOn(payload.revertSignals === 1);
      setIsModified(false);

      // 🔥 Gọi callback để cập nhật `FundBot.js`
      if (onUserDataUpdate) {
        onUserDataUpdate(updatedUserData.trading_accounts);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Failed to save settings. Error: ${error.message}`);
    }
  };

  return (
    <div className="signal-container">
      <div className="portfolio-header-title">
        <img src={controllermoreIcon} alt="Balance Icon" className="portfolio-icon" />
        <span>More Options</span>
      </div>
      <hr className="portfolio-divider-fullwidth" />

      <div className="signal-body">
        {/* Place Stop Loss to Entry */}
        <div className="signal-body-item">
          <span className="icon">⚖️</span>
          <span className="text">Place Stop Loss to Entry</span>
          <div className="strategy-toggle">
            <div
              className={`strategy-switch ${isSLtoEntryOn ? "on" : "off"}`}
              onClick={() => {
                setIsSLtoEntryOn(!isSLtoEntryOn);
                setIsModified(true);
              }}
            >
              <div className="strategy-knob"></div>
            </div>
          </div>
        </div>

        {/* Trade against all auto-followed signals */}
        <div className="signal-body-item">
          <span className="icon">🧠</span>
          <span className="text">Trade against all auto-followed signals</span>
          <div className="strategy-toggle">
            <div
              className={`strategy-switch ${isRevertSignalsOn ? "on" : "off"}`}
              onClick={() => {
                setIsRevertSignalsOn(!isRevertSignalsOn);
                setIsModified(true);
              }}
            >
              <div className="strategy-knob"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Nút Save */}
      {isModified && (
        <div className="strategy-footer">
          <button className="strategy-footer-button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ControllerMore;
