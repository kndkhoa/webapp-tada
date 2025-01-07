import React from "react";
import "./Charity.css";
import usdtIcon from './assets/icons/usdt.png';

const Charity = ({ id, title, pic, description, completion, value, avatar1, avatar2, avatar3, avatar4, members, gift_title }) => {
  return (
    <div className="charity">
      <div className="charitypic-container">
        <img src={pic} alt="charity Pic" className="charity-pic" />
      </div>
      <div className="charity-content">
        <h2>{title}</h2>
        <p>{description}</p>
        
        {/* Status Line */}
        <div className="status-line">
          <div className="status-background"></div>
          <div className="status-progress" style={{ width: `${(completion/value)*100}%` }}></div>
          <span
            className="charity-status-text"
            style={{ left: `${(completion / value) * 100}%`, top: '-25px' }}>
            {completion}
          </span>
        </div>
        <div className="quiz-footer-container">
          <div className="quiz-footer">
            <span className="total">{gift_title}</span>
            <span className="value-icon">
              <img src={usdtIcon} alt="USDT Icon" className="usdt-icon" />
              {value} USDT
            </span>
          </div>
          <div className="players">
            <div className="avatar-container">
              <div className="avatar" style={{ backgroundImage: `url(${avatar1})` }}></div>
              <div className="avatar" style={{ backgroundImage: `url(${avatar2})` }}></div>
              <div className="avatar" style={{ backgroundImage: `url(${avatar3})` }}></div>
              <div className="avatar" style={{ backgroundImage: `url(${avatar4})` }}></div>
            </div>
            + {members}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charity;
