import React from 'react';
import './Quiz-Rules.css'; // Đảm bảo đã thêm CSS cho phần tử
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import supportIcon from '../components/assets/icons/support.png'; // Đảm bảo đường dẫn đúng
import nextIcon from '../components/assets/icons/next.png'; // Đảm bảo đường dẫn đúng

function GiftRules({ quiz }) {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

  // Hàm xử lý khi nhấn nút
  const handleNavigate = () => {
    navigate(`/news/${quiz.id}?dataType=${quiz.dataType}`);
  };

  return (
    <div className="card-container">
      {/* Tiêu đề */}
      <div className="card-title">Cách sử dụng và đổi quà</div>
      <div className="card-divider"></div>
      {/* Danh sách luật chơi */}
      <div className="rules-list">
        {quiz.Rules && quiz.Rules.map((rule, index) => (
          <div className="rule-item" key={index}>
            <div className="rule-index">{index + 1}</div>
            <div className="rule-text">{rule.description}</div>
          </div>
        ))}
      </div>
      {/* Đường phân chia */}
      <div className="card-divider"></div>
      {/* Phần Button */}
      <div className="card-buttons">
        <button
          className="card-button"
          onClick={() => window.location.href = 'https://t.me/tadaupsupport'}>
          <img src={supportIcon} alt="icon" className="ideas-icon" />
          <span>Liên hệ hỗ trợ</span>
          <img src={nextIcon} alt="arrow" className="arrow-icon" />
        </button>
      </div>
    </div>
  );
}

export default GiftRules;
