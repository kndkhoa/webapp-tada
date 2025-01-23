import React from "react";
import coinIcon from "./assets/icons/coin-header.png";
import menuIcon from "./assets/icons/menu.png";
import chatIcon from "./assets/icons/chat.png";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ walletAC, userId }) => {
  return (
    <header className="header">
      <div className="left-section">
        {/* Điều hướng đến trang Setting theo userId */}
        <Link to={`/setting/${userId}`} className="menusetting-container">
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </Link>
        <div className="coins">
          <img src={coinIcon} alt="Coin" className="coin-icon" />
          <span>{walletAC}</span> {/* Hiển thị wallet_AC từ props */}
        </div>
      </div>
      <div className="chat-container">
        <img src={chatIcon} alt="Chat" className="chat-icon" />
      </div>
    </header>
  );
};

export default Header;
