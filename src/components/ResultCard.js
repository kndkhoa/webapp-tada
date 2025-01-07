import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from './assets/avatar.gif'; // Đường dẫn đến ảnh avatar
import './ResultCard.css'; // Import CSS riêng
import targetIcon from '../components/assets/icons/target.png'; // Đảm bảo đường dẫn đúng

const ResultCard = ({ id, dataType, correctAnswersCount, totalQuestions, timer }) => {
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn nút "Quay về menu chính"
  const handleBackToMenu = () => {
    navigate('/dautruong');
  };

  return (
    <>
      <div className="overlay"></div> {/* Lớp overlay nền trắng */}
      <div className="result-card-container">
        <div className="result-card">
          <img src={avatar} alt="Avatar" className="result-card-avatar" />
          <div className="result-card-details">
            <h3>Chúc mừng anh chị đã hoàn thành phần thử thách!!</h3>

            {/* Khung chữ nhật với icon và câu trả lời đúng nằm ở đây */}
            <div className="result-card-box">
              <img src={targetIcon} alt="Target Icon" className="result-card-icon" />
              <span className="result-card-answer"><b>{correctAnswersCount} / {totalQuestions}</b> câu trả lời đúng</span>
            </div>

            <p>Hoàn thành trong</p> 
            <p className="bold-text">{timer}</p>
          </div>

          <button className="result-card-button" onClick={handleBackToMenu}>
            Quay lại đấu trường
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultCard;
