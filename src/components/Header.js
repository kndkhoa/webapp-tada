import React from "react";
import coinIcon from "./assets/icons/coin-header.png"; // Import icon coin
import menuIcon from "./assets/icons/menu.png"; // Import icon menu
import chatIcon from "./assets/icons/chat.png"; // Import icon chat
import { Link } from "react-router-dom"; // Import Link để điều hướng
import "./Header.css";

const Header = () => {
  const userId = 1; // Giả sử ID người dùng là 123. Bạn có thể thay đổi hoặc lấy từ state/props.

  return (
    <header className="header">
      <div className="left-section">
        {/* Điều hướng đến trang Setting theo ID */}
        <Link to={`/setting/${userId}`} className="menusetting-container">
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </Link>
        <div className="coins">
          <img src={coinIcon} alt="Coin" className="coin-icon" />
          <span>8050</span>
        </div>
      </div>
      <div className="chat-container">
        <img src={chatIcon} alt="Chat" className="chat-icon" />
      </div>
    </header>
  );
};

export default Header;
