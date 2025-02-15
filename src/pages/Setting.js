import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Setting.css";
import backIcon from "../components/assets/icons/back.png";
import naptienIcon from "../components/assets/icons/naptien.png";
import ruttienIcon from "../components/assets/icons/ruttien.png";
import acIcon from "../components/assets/icons/coin-header.png";
import bg from "../components/assets/bg-setting.jpg";
import SettingMenu from "../components/Setting-Menu";
import About from "../components/About";
import Terms from "../components/Terms";
import Language from "../components/Language";
import Profile from "../components/Profile";
import BuyAC from "../components/BuyAC"; // Import component BuyAC
import { PreloadImage } from "../components/waiting";

function Setting() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isMenuSelected, setIsMenuSelected] = useState(false);
  const [showBuyAC, setShowBuyAC] = useState(false);
  const [showFullAC, setShowFullAC] = useState(false);

  // Lấy dữ liệu người dùng từ localStorage và cập nhật state
  useEffect(() => {
    const cachedUserData = localStorage.getItem("userData");

    if (cachedUserData) {
      const parsedUserData = JSON.parse(cachedUserData);
      setUserData(parsedUserData); // Cập nhật state khi có dữ liệu
    } else {
      console.error("No user data found in localStorage!");
    }

    // Cập nhật `loading` thành false sau khi đã lấy dữ liệu
    setLoading(false);
  }, []);

  // Kiểm tra dữ liệu người dùng có đúng với id từ URL
  const user = userData && userData.userID === id ? userData : null;

  // Nếu dữ liệu đang tải, hiển thị trạng thái chờ
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Nếu không tìm thấy người dùng với id tương ứng
  if (!user) {
    return <div>Không tìm thấy người dùng</div>;
  }

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
    setIsMenuSelected(true);
  };

  const handleBack = () => {
    setSelectedMenu(null);
    setIsMenuSelected(false);
  };

  return (
    <div className="setting-detail-container">
      <div className="bannersetting-header">
        <button className="backIcon" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Back Icon" className="backIconImage" />
        </button>
        <img src={bg} alt="Banner" className="bannersetting-image" />
        <div className="avatarsetting">
          {/* Đảm bảo rằng userData có avatar trước khi hiển thị */}
          {userData && userData.avatar ? (
            <PreloadImage
              src={userData.avatar} // Sử dụng URL của avatar nếu có
              alt="Avatar"
            />
          ) : (
            <div className="avatar-placeholder">No Avatar</div>
          )}
        </div>
      </div>

      <div className="setting-detail-content">
        <div className="setting-detail-row">
          {/* AC */}
          <div
            className="setting-detail-item"
            onClick={() => setShowFullAC((prev) => !prev)}
          >
            <img
              src={acIcon}
              alt="Icon"
              className="setting-detail-item-icon"
            />
            <div className="setting-detail-item-text">
              <span className="setting-detail-item-text-small">AC</span>
              <span className="setting-detail-item-text-large">
                {showFullAC ? userData.wallet_AC : formatNumber(userData.wallet_AC)}
              </span>
            </div>
          </div>

          {/* NẠP RÚT */}
          <div
            className="setting-detail-item setting-detail-item-deposit"
            onClick={() => setShowBuyAC(true)}
          >
            <img
              src={naptienIcon}
              alt="Icon"
              className="setting-coin-icon"
            />
            <div className="setting-detail-item-text setting-detail-item-text-naprut">
              <span className="setting-coin-button">Buy AC</span>
            </div>
          </div>

          {/* Rút tiền */}
          <div className="setting-detail-item setting-detail-item-withdraw">
            <img
              src={ruttienIcon}
              alt="Icon"
              className="setting-coin-icon"
            />
            <div className="setting-detail-item-text setting-detail-item-text-naprut">
              <span className="setting-coin-button">Withdraw</span>
            </div>
          </div>
        </div>

        {showBuyAC && (
          <div className="report-modal">
            <BuyAC
              userID={userData.userID}
              walletAC={userData.wallet_AC}
              onClose={() => setShowBuyAC(false)}
            />
          </div>
        )}

        {/* Nội dung chính (SettingMenu, Profile, Language, Terms, About) */}
        {!isMenuSelected ? (
          <SettingMenu onMenuSelect={handleMenuSelect} />
        ) : (
          <div>
            {selectedMenu === "profile" && <Profile user={user} onBack={handleBack} />}
            {selectedMenu === "language" && <Language onBack={handleBack} />}
            {selectedMenu === "terms" && <Terms onBack={handleBack} />}
            {selectedMenu === "about" && <About onBack={handleBack} />}
          </div>
        )}
      </div>
    </div>
  );
}

function formatNumber(value) {
  if (value == null) {
    return '0'; // Nếu value là null hoặc undefined, trả về giá trị mặc định
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`; // Hiển thị dạng 'x.xM'
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`; // Hiển thị dạng 'x.xK'
  }
  return value.toString(); // Trả về giá trị gốc nếu nhỏ hơn 1,000
}

export default Setting;
