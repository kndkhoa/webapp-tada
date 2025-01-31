import React from "react";
import "./QuizCard.css";
import usdtIcon from './assets/icons/usdt.png';
import timerIcon from './assets/icons/timer.png';
import doneIcon from './assets/icons/done.png';

const QuizCard = ({ 
  id, 
  dataType,
  title, 
  pic, 
  description, 
  prizeValue, 
  done_at, 
  topCompleters, // Truyền danh sách topCompleters
  members, 
  gift_title, 
  status, 
  created_at 
}) => {
  // Tính toán số ngày còn lại hoặc đã qua
  const currentDate = new Date();
  const createdDate = new Date(created_at);
  const daysElapsed = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));
  const daysLeft = done_at - daysElapsed;

  // Thêm tiền tố vào link ảnh
  const BASE_URL = "http://admin.tducoin.com/public/storage/";
  const picUrl = `${BASE_URL}${pic}`;

  return (
    <div className="quiz-card">
      <div className="pic-container">
        <img src={picUrl} alt="Quiz Pic" className="quiz-pic" />

        {/* Hiển thị nội dung dựa vào status */}
        {status === 1 ? (
          <div className="time-left">
            <img src={timerIcon} alt="Timer Icon" className="timer-icon" />
            <span>Kết thúc trong {daysLeft > 0 ? `${daysLeft} ngày` : "hôm nay"}</span>
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
              {prizeValue} USDT
            </span>
          </div>
          <div className="players">
            <div className="avatar-container">
              {/* Hiển thị avatar từ topCompleters */}
              {topCompleters &&
                topCompleters.slice(0, 4).map((member, index) => (
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

export default QuizCard;
