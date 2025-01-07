import React from "react";
import "./News.css";
import heartIcon from './assets/icons/heart.png';
import commentIcon from './assets/icons/comment.png';
import coinactiveIcon from './assets/icons/coin-active.png';
import doneIcon from './assets/icons/done.png';
import sharingIcon from './assets/icons/sharing.png';

const News = ({ id, dataType, title, pic, description, coinactive, heartValue, commentValue, name, time, status }) => {
  return (
    <div className="news">
      <div className="news-content">
        <h2>{title}</h2>
        <p className="name-time">{name} - {time}</p>
        <p>{description}</p>
        <div className="news-pic-container">
          <img src={pic} alt="Pic" className="news-pic" />

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

          <div className="news-footer-container">
            <div className="news-footer">
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

export default News;
