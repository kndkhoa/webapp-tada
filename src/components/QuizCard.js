import React from "react";
import "./QuizCard.css";
import usdtIcon from './assets/icons/usdt.png';
import timerIcon from './assets/icons/timer.png';
import doneIcon from './assets/icons/done.png';

const QuizCard = ({ id, dataType, title, pic, description, value, timer, avatar1, avatar2, avatar3, avatar4, members, gift_title, status }) => {
  return (
    <div className="quiz-card">
      <div className="pic-container">
        <img src={pic} alt="Quiz Pic" className="quiz-pic" />

        {/* Chỉ xét if để hiển thị nội dung dựa vào status */}
        {status === 1 ? (
             <div className="time-left">
             <img src={timerIcon} alt="Timer Icon" className="timer-icon" />
             <span>{timer}</span>
           </div>
          ) : (
            <div className="done">
              <img src={doneIcon} alt="Done Icon" className="done-icon" />
              <span>Đã hoàn thành</span>
            </div>
          )}
      </div>
      <div className="quiz-content">
        <h2>{title}</h2>
        <p>{description}</p>
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
            {members}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
