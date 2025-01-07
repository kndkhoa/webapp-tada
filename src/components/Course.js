import React from "react";
import "./Course.css";
import coinactiveIcon from './assets/icons/coin-active.png';
import doneIcon from './assets/icons/done.png';

const Course = ({ id, title, pic, description, coinactive, completion, status }) => {
  return (
    <div className="course">
      <div className="pic-container">
        <img src={pic} alt="course Pic" className="course-pic" />
        {/* Chỉ xét if để hiển thị nội dung dựa vào status */}
        {status === 1 ? (
            <div className="coin-active">
              <img src={coinactiveIcon} alt="CoinActive Icon" className="coinactive-icon" />
              <span>{coinactive} điểm</span>
            </div>
          ) : (
            <div className="done">
              <img src={doneIcon} alt="Done Icon" className="done-icon" />
              <span>Đã hoàn thành</span>
            </div>
          )}

      </div>
      <div className="course-content">
        <h2>{title}</h2>
        <p>{description}</p>
        
        {/* Status Line */}
        <div className="status-line">
          <div className="status-background"></div>
          <div className="status-progress" style={{ width: `${completion}%` }}></div>
          <span className="status-text" style={{ left: `${completion}%`, top: '-25px' }}>{completion}%</span> {/* Text showing percentage */}
        </div>
      </div>
    </div>
  );
};

export default Course;
