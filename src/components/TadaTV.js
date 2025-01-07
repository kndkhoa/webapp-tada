import React from "react";
import "./TadaTV.css";
import heartIcon from './assets/icons/heart.png';
import commentIcon from './assets/icons/comment.png';
import coinactiveIcon from './assets/icons/coin-active.png';
import doneIcon from './assets/icons/done.png';
import sharingIcon from './assets/icons/sharing.png';
import clipIcon from './assets/icons/clip.png';

const TadaTV = ({  id, category, title, pic, description, coinactive, heartValue, commentValue, name, time, status }) => {
  return (
    <div className="tadatv">     
      <div className="tadatv-content">
        <h2>{title}</h2>
        <p className="name-time">{name} - {time}</p>
        <p>{description}</p>
        <div className="tadatv-pic-container">
          <img src={pic} alt="Pic" className="tadatv-pic" />
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
          <div className="clip">
            <img src={clipIcon} alt="Clip Icon" className="clip-icon" />
          </div>
          <div className="tadatv-footer-container">
            <div className="tadatv-footer">
              <div className="left-icons">
                <span className="value-iconheart">
                  <img src={heartIcon} alt="Heart Icon" className="heart-icon" />
                  {heartValue}
                </span>
                <span className="value-iconcomment">
                  <img src={commentIcon} alt="Comment Icon" className="comment-icon" />
                  {commentValue}
                </span>
              </div>
              <div className="share-icon-container">
                <span className="value-iconshare">
                  Chia sẻ
                  <img src={sharingIcon} alt="Share Icon" className="share-icon" />
                </span>
              </div>
            </div>
          </div>       
        </div>
      </div>
    </div>
  );
};

export default TadaTV;
