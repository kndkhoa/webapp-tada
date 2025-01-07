import React from 'react';
import './Quiz-Result.css'; // Đảm bảo đã thêm CSS cho phần tử
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import targetIcon from '../components/assets/icons/target.png'; // Đảm bảo đường dẫn đúng

function QuizResult({ quiz }) {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

  return (
    <div className="quiz-result-container">
      <div className="quiz-result-item">
        <div className="quiz-result-icon-text">
          <div className="result-icon-container">
            <img src={targetIcon} alt="icon" className="result-icon" />
          </div>
          <div className="quiz-result-correct-answers">
            <span>{quiz.correctAnswers}</span> Câu trả lời đúng
          </div>
        </div>
      </div>

      <div className="quiz-result-time-label">
        Thời gian hoàn thành
      </div>

      <div className="quiz-result-time-completion">
        {quiz.resultTime}
      </div>
    </div>
  );
}

export default QuizResult;
