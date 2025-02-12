import React, { useState, useRef, useEffect } from "react";
import "./Signal.css";
import "./Controller-Strategy.css";
import botsettingIcon from "./assets/icons/bot-setting.png";
import upIcon from "./assets/icons/up.png";
import downIcon from "./assets/icons/down.png";
import TelegramNotification from './TelegramNotification';

const ControllerStrategy = ({ userID, accountMT5, trading_accounts, onUserDataUpdate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAutoBotOn, setIsAutoBotOn] = useState(false);
  const [isStrategyManagementOn, setIsStrategyManagementOn] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [numericValue, setNumericValue] = useState("");
  const [channelsDropdownOpen, setChannelsDropdownOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const dropdownRef = useRef(null);
  const channelsDropdownRef = useRef(null);

  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [channelsDropdownHeight, setChannelsDropdownHeight] = useState(0);

  // Tìm tài khoản giao dịch tương ứng với accountMT5
  const currentAccount = trading_accounts?.find(
    (account) => account.accountMT5 === accountMT5
  );

  // Lấy danh sách các kênh đang theo dõi (autoCopy = 1)
  const followingChannels = currentAccount?.following_channels || [];

  // Lấy chiến lược quản lý vốn từ tài khoản giao dịch
  const capitalManagement = currentAccount?.capitalManagement || "";

  // Khởi tạo trạng thái ban đầu
  useEffect(() => {
    if (currentAccount) {
      // Bật Auto Bot nếu có bất kỳ kênh nào đang theo dõi
      setIsAutoBotOn(followingChannels.some((channel) => channel.autoCopy === 1));

      // Bật Capital Management nếu có chiến lược được chọn
      setIsStrategyManagementOn(capitalManagement !== "None");
      setSelectedStrategy(capitalManagement);

      // Khởi tạo numericValue từ orderSL
      setNumericValue(currentAccount.orderSL || "");

      // Khởi tạo danh sách các kênh đang theo dõi
      setSelectedChannels(
        followingChannels
          .filter((channel) => channel.autoCopy === 1)
          .map((channel) => channel.author)
      );
    }
  }, [currentAccount, followingChannels, capitalManagement]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleChannelsDropdown = () => {
    setChannelsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    } else {
      setDropdownHeight(0);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (channelsDropdownOpen && channelsDropdownRef.current) {
      setChannelsDropdownHeight(channelsDropdownRef.current.scrollHeight);
    } else {
      setChannelsDropdownHeight(0);
    }
  }, [channelsDropdownOpen]);

  // Hàm xử lý khi nhấn nút Save
  const handleSave = async () => {
    try {
      // Tạo payload từ dữ liệu hiện tại
      const payload = {
        userID: userID,
        accountMT5: accountMT5,
        capitalManagement: isStrategyManagementOn ? selectedStrategy : "None",
        orderSL: isStrategyManagementOn ? 0 : numericValue,
        authors: isAutoBotOn
          ? [
              // Các kênh đang được chọn (autoCopy = 1)
              ...selectedChannels.map((author) => ({
                author: author,
                autoCopy: 1,
              })),
              // Các kênh đã bỏ chọn (autoCopy = 0)
              ...followingChannels
                .filter((channel) => !selectedChannels.includes(channel.author))
                .map((channel) => ({
                  author: channel.author,
                  autoCopy: 0,
                })),
            ]
          : // Nếu Auto Bot tắt, đặt tất cả các kênh về autoCopy = 0
            followingChannels.map((channel) => ({
              author: channel.author,
              autoCopy: 0,
            })),
      };
  
      // Gọi API
      const response = await fetch(
        "https://admin.tducoin.com/api/webappuser/tradingaccount",
        {
          method: "POST",
          headers: {
            "x-api-key": "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Đọc phản hồi lỗi từ API
        console.error("API Error Response:", errorResponse); // Debug lỗi
        <TelegramNotification
          message={
            "Lỗi POST Save tùy chỉnh component Strategy" +
            errorResponse.message +
            " từ user " +
            userID
          }
        />;
        throw new Error(errorResponse.message || "Failed to save data");
      }
  
      // Cập nhật sessionStorage
      const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));
      const updatedUserData = {
        ...cachedUserData,
        trading_accounts: cachedUserData.trading_accounts.map((account) =>
          account.accountMT5 === accountMT5
            ? {
                ...account,
                following_channels: payload.authors, // Cập nhật following_channels từ payload.authors
                capitalManagement: payload.capitalManagement,
                orderSL: payload.orderSL,
              }
            : account
        ),
      };
      sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
  
      // Gọi callback để cập nhật state trong file chính
      if (onUserDataUpdate) {
        onUserDataUpdate(updatedUserData.trading_accounts); // Truyền updatedAccounts đúng cách
      }
  
      // Reset trạng thái sau khi lưu thành công
      setIsModified(false);
    } catch (error) {
      <TelegramNotification
        message={
          "Lỗi POST Save tùy chỉnh component Strategy" +
          error.message +
          " từ user " +
          userID
        }
      />;
    }
  };

  return (
    <div className="signal-container">
      <div className="portfolio-header-title">
        <img src={botsettingIcon} alt="Balance Icon" className="portfolio-icon" />
        <span>Main Settings</span>
      </div>
      <hr className="portfolio-divider-fullwidth" />

      <div className="signal-body">
        {/* Auto Bot */}
        <div className="signal-body-item">
          <span className="icon">🤖</span>
          <span className="text">Following Channels</span>
          <div className="strategy-toggle">
            <div
              className={`strategy-switch ${isAutoBotOn ? "on" : "off"}`}
              onClick={() => {
                setIsAutoBotOn(!isAutoBotOn);
                setIsModified(true);
              }}
            >
              <div className="strategy-knob"></div>
            </div>
          </div>
        </div>

        {isAutoBotOn && (
          <div className="signal-body-item" style={{ marginBottom: "15px" }}>
            <div className="dropdown">
              <div
                className="dropdown-header"
                onClick={toggleChannelsDropdown}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span className="text">List Channels</span>
                <span className="dropdown-arrow">
                  <img src={channelsDropdownOpen ? upIcon : downIcon} alt="Toggle Icon" className="dropdown-icon" />
                </span>
              </div>
              <div
                ref={channelsDropdownRef}
                className="dropdown-menu"
                style={{
                  height: channelsDropdownHeight ? `${channelsDropdownHeight}px` : "0px",
                  overflow: "hidden",
                  transition: "height 0.3s ease-in-out",
                  padding: channelsDropdownOpen ? "6px 5px" : "0",
                }}
              >
                {followingChannels.length > 0 ? (
                  followingChannels.map((channel) => (
                    <div key={channel.author} className="dropdown-item" style={{ display: "flex", alignItems: "center", padding: "6px 5px" }}>
                      <input
                        type="checkbox"
                        value={channel.author}
                        checked={selectedChannels.includes(channel.author)}
                        onChange={() => {
                          setSelectedChannels((prev) =>
                            prev.includes(channel.author)
                              ? prev.filter((ch) => ch !== channel.author)
                              : [...prev, channel.author]
                          );
                          setIsModified(true);
                        }}
                        style={{ marginRight: "8px" }}
                      />
                      <label className="strategy-checkbox-option" style={{ flex: 1 }}>
                        {channel.author}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item" style={{ padding: "6px 5px", textAlign: "center" }}>
                    No channels available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Strategy Management */}
        <div className="signal-body-item">
          <span className="icon">🎯</span>
          <span className="text">Capital Management</span>
          <div className="strategy-toggle">
            <div
              className={`strategy-switch ${isStrategyManagementOn ? "on" : "off"}`}
              onClick={() => {
                setIsStrategyManagementOn(!isStrategyManagementOn);
                setIsModified(true);

                // Reset selectedStrategy khi tắt Capital Management
                if (!isStrategyManagementOn) {
                  setSelectedStrategy("");
                }

                // Khởi tạo numericValue từ orderSL
                setNumericValue(currentAccount?.orderSL || "");
              }}
            >
              <div className="strategy-knob"></div>
            </div>
          </div>
        </div>

        {isStrategyManagementOn ? (
          <div className="signal-body-item">
            <div className="dropdown">
              <div
                className="dropdown-header"
                onClick={toggleDropdown}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span 
                  className="text" 
                  style={{ fontWeight: isDropdownOpen ? "bold" : "normal" }}
                >
                  {selectedStrategy || "Strategy Options"}
                </span>
                <span className="dropdown-arrow">{isDropdownOpen ? "🡵" : "🡶"}</span>
              </div>
              <div
                ref={dropdownRef}
                className="dropdown-menu"
                style={{
                  height: dropdownHeight ? `${dropdownHeight}px` : "0px",
                  overflow: "hidden",
                  transition: "height 0.3s ease-in-out",
                  padding: isDropdownOpen ? "6px 5px" : "0",
                }}
              >
                {[
                  "Risk 1 : Reward 6 - Profit 10% - Lost 15 Orders",
                  "Risk 1 : Reward 1 - Profit 6% - Lost 4 Orders",
                  "Risk 1 : Reward 1 - Profit 3% - Lost 5 Orders",
                  "Risk 1 : Reward 2 - Profit 30% - Lost 3 Orders",
                  "Risk 1 : Reward 2 - Profit 15% - Lost 5 Orders",
                  "Risk 1 : Reward 3 - Profit 1% - Lost 15 Orders",
                  "Risk 1 : Reward 10 - Profit 17% - Lost 20 Orders",
                  "Risk 1 : Reward 20 - Profit 6% - Lost 50 Orders",
                ].map((strategy) => (
                  <div key={strategy} className="dropdown-item">
                    <label
                      className="strategy-radio-option"
                      style={{ fontWeight: "normal" }}
                    >
                      <input
                        type="radio"
                        name="strategy-option"
                        value={strategy}
                        checked={selectedStrategy === strategy}
                        onChange={(e) => {
                          setSelectedStrategy(e.target.value);
                          setIsModified(true);
                        }}
                      />
                      {strategy}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="signal-body-item">
            <input
              type="number"
              className="strategy-number-input"
              placeholder="Enter a Stop Loss value"
              value={numericValue}
              onChange={(e) => {
                setNumericValue(e.target.value);
                setIsModified(true);
              }}
            />
          </div>
        )}
      </div>

      {/* NÚT SAVE CHỈ HIỆN KHI CÓ THAY ĐỔI */}
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

export default ControllerStrategy;
