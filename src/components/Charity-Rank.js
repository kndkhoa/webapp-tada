import React from 'react';
import './Quiz-Rank.css'; // Đảm bảo file CSS đã được thêm

function CharityRank({ quiz }) {
  // Kiểm tra nếu không có danh sách charity
  if (!quiz.listCharity || quiz.listCharity.length === 0) {
    return <div>Chưa có thông tin quyên góp nào.</div>;
  }

  return (
    <div className="card-container">
      {quiz.listCharity.map((charity, index) => (
        <div key={index}>
          {/* Hiển thị thông tin từng dòng charity */}
          <div className="card-row">
            <div className="left-section">
              <div className="rank">#{index + 1}</div>
              <div className="quizrank-circle">
                <img
                  src={charity.avatar}
                  alt={`Avatar ${index + 1}`}
                  className="avatar-image"
                />
              </div>
              <div className="rank-name">{charity.name}</div>
            </div>
            <div className="rank-time">{charity.amount}</div>
          </div>

          {/* Đường phân chia (ẩn sau dòng cuối) */}
          {index < quiz.listCharity.length - 1 && (
            <div className="card-divider"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CharityRank;
