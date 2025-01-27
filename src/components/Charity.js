import React from "react";
import "./Charity.css";
import usdtIcon from './assets/icons/usdt.png';

const Charity = ({ id, title, banner, description, charity_target, charity_status, top_contributors, members, charity_title }) => {
  const BASE_URL = "http://admin.tducoin.com/public/storage/";
  const picUrl = `${BASE_URL}${banner}`;
  
  return (
    <div className="charity">
      <div className="charitypic-container">
        <img src={picUrl} alt="charity Pic" className="charity-pic" />
      </div>
      <div className="charity-content">
        <h2>{title}</h2>
        <p>{description}</p>
        
        {/* Status Line */}
        <div className="status-line">
          <div className="status-background"></div>
          <div className="status-progress" style={{ width: `${(charity_status/charity_target)*100}%` }}></div>
          <span
            className="charity-status-text"
            style={{ left: `${(charity_status / charity_target) * 100}%`, top: '-25px' }}>
            {charity_status}
          </span>
        </div>
        <div className="quiz-footer-container">
          <div className="quiz-footer">
            <span className="total">{charity_title}</span>
            <span className="value-icon">
              <img src={usdtIcon} alt="USDT Icon" className="usdt-icon" />
              {charity_target} USDT
            </span>
          </div>
          <div className="players">
            <div className="avatar-container">
            {top_contributors &&
                top_contributors.slice(0, 4).map((member, index) => (
                  <div
                    key={index}
                    className="avatar"
                    style={{
                      backgroundImage: `url(${BASE_URL}${member.avatar})`
                    }}
                  ></div>
                ))}
            </div>
            + {members}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charity;
