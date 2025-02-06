import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import coinIcon from "./assets/icons/coin-header.png";
import menuIcon from "./assets/icons/menu.png";
import chatIcon from "./assets/icons/chat.png";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ userId }) => {
  const [walletAC, setWalletAC] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("userData")) || {};
    setWalletAC(storedUserData.wallet_AC || 0);

    window.updateHeaderWalletAC = (newBalance) => {
      setWalletAC(newBalance);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (location.pathname === "/home") {
      interval = setInterval(() => {
        const storedUserData = JSON.parse(sessionStorage.getItem("userData")) || {};
        setWalletAC(storedUserData.wallet_AC || 0);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [location.pathname]);

  // Hàm đóng WebApp để quay về giao diện chính của Telegram
  const handleCloseWebApp = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    } else {
      console.warn("Telegram WebApp API không khả dụng.");
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <Link to={`/setting/${userId}`} className="menusetting-container">
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </Link>
        <div className="coins">
          <img src={coinIcon} alt="Coin" className="coin-icon" />
          <span>{walletAC}</span>
        </div>
      </div>
      <div className="chat-container">
        <img 
          src={chatIcon} 
          alt="Chat" 
          className="chat-icon" 
          onClick={handleCloseWebApp} 
        />
      </div>
    </header>
  );
};

export default Header;
