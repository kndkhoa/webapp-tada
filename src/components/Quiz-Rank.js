import React from 'react';
import './Quiz-Rank.css'; // Đảm bảo đã thêm CSS cho phần tử

function QuizRank({ quiz }) {
  return (
    <div className="card-container">
      {/* Dòng 1 */}
      <div className="card-row">
        <div className="left-section">
          <div className="rank">#1</div>
          <div className="quizrank-circle">
            <img src={quiz.winner1} alt="Avatar 1" className="avatar-image" />
          </div>
          <div className="rank-name">{quiz.winner1_name}</div>
        </div>
        <div className="rank-time">{quiz.winner1_timer}</div>
      </div>

      <div className="card-divider"></div> {/* Đường phân chia */}

      {/* Dòng 2 */}
      <div className="card-row">
        <div className="left-section">
          <div className="rank">#2</div>
          <div className="quizrank-circle">
            <img src={quiz.winner2} alt="Avatar 2" className="avatar-image" />
          </div>
          <div className="rank-name">{quiz.winner2_name}</div>
        </div>
        <div className="rank-time">{quiz.winner2_timer}</div>
      </div>

      <div className="card-divider"></div> {/* Đường phân chia */}

      {/* Dòng 3 */}
      <div className="card-row">
        <div className="left-section">
          <div className="rank">#3</div>
          <div className="quizrank-circle">
            <img src={quiz.winner3} alt="Avatar 3" className="avatar-image" />
          </div>
          <div className="rank-name">{quiz.winner3_name}</div>
        </div>
        <div className="rank-time">{quiz.winner3_timer}</div>
      </div>
    </div>
  );
}

export default QuizRank;
