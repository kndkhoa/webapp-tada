import React from "react";
import "./Gift.css";
import coinIcon from "./assets/icons/coin-header.png";

const Gift = ({ title, banner, description, giftValue, gift_title, remaining_gifts, backgroundColor }) => {
  
  const BASE_URL = "http://admin.tducoin.com/public/storage/";
  const picUrl = `${BASE_URL}${banner}`;
  
  return (
    <div className="gift" style={{ backgroundColor: backgroundColor || "#186ECC" }}>
      <div className="giftpic-container">
        <img src={picUrl} alt="gift Pic" className="gift-pic" />
      </div>
      <div className="gift-content">
        <h2>{title}</h2>
        <p>{description}</p>      
        <div className="gift-footer-container">
          <div className="gift-footer">
            <span className="total">{gift_title}</span>
            <span className="value-icon">
              <img src={coinIcon} alt="CoinActive Icon" className="giftcoin-icon" />
              {giftValue} điểm
            </span>
          </div>
          <div className="gift-amount">            
            <span>CÒN LẠI</span>
            <span><b>{remaining_gifts}</b></span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Gift;
