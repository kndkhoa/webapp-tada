import React from "react";
import "./Gift.css";
import coinIcon from "./assets/icons/coin-header.png";

const Gift = ({ id, title, pic, description, value, gift_title, amount, backgroundColor }) => {
  return (
    <div className="gift" style={{ backgroundColor: backgroundColor || "#186ECC" }}>
      <div className="giftpic-container">
        <img src={pic} alt="gift Pic" className="gift-pic" />
      </div>
      <div className="gift-content">
        <h2>{title}</h2>
        <p>{description}</p>      
        <div className="gift-footer-container">
          <div className="gift-footer">
            <span className="total">{gift_title}</span>
            <span className="value-icon">
              <img src={coinIcon} alt="CoinActive Icon" className="giftcoin-icon" />
              {value} điểm
            </span>
          </div>
          <div className="gift-amount">            
            <span>CÒN LẠI</span>
            <span><b>{amount}</b></span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Gift;
