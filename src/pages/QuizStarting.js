import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import questions from '../components/questions'; // Import danh sách câu hỏi
import coinIcon from '../components/assets/icons/coin-header.png'; // Import icon coin
import './QuizStarting.css'; // Import CSS
import ResultCard from '../components/ResultCard'; // Import ResultCard component

// Import âm thanh
import correctSound from '../components/assets/sounds/correct-answer.mp3';
import incorrectSound from '../components/assets/sounds/incorrect-answer.mp3';

const QuizStarting = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [searchParams] = useSearchParams();
  const dataType = searchParams.get('dataType'); // Lấy dataType từ query string

  const [selectedAnswer, setSelectedAnswer] = useState(null); // Đáp án được chọn
  const [questionNumber, setQuestionNumber] = useState(0); // Câu hỏi hiện tại (index)
  const [isCorrect, setIsCorrect] = useState(null); // Kết quả đúng/sai
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã kiểm tra
  const [quizCompleted, setQuizCompleted] = useState(false); // Trạng thái hoàn thành bài thi
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Số câu đúng

  const totalQuestions = questions.length; // Tổng số câu hỏi

  const [timer, setTimer] = useState(0); // Tổng thời gian (ms)
  const timerRef = useRef(null); // Dùng để lưu tham chiếu đến interval

  // Hiệu ứng âm thanh
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  // Hàm khởi động đồng hồ
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 10); // Cộng thêm 10ms mỗi lần
      }, 10);
    }
  };

  // Hàm tạm dừng đồng hồ
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Hàm định dạng thời gian
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    return `${minutes} : ${seconds} : ${milliseconds}`;
  };

  useEffect(() => {
    if (isSubmitted !== null) {
      if (isCorrect) {
        playSound(correctSound);
        setCorrectAnswersCount((prev) => prev + 1); // Tăng số câu đúng
      } else if (isCorrect === false) {
        playSound(incorrectSound);
        // Hiệu ứng rung
        if ('vibrate' in navigator) {
          navigator.vibrate(300); // Rung trong 300ms
        }
      }
    }
  }, [isSubmitted, isCorrect]);

  const handleAnswerClick = (answer) => {
    if (!isSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      // Tạm dừng đồng hồ khi nhấn "Kiểm tra"
      pauseTimer();
      // Kiểm tra đáp án
      const correctAnswer = questions[questionNumber].correctAnswer;
      const result = selectedAnswer === correctAnswer;
      setIsCorrect(result);
      setIsSubmitted(true); // Đánh dấu đã kiểm tra
  
      // Kiểm tra nếu đang ở câu cuối cùng, hiển thị kết quả ngay lập tức
      if (questionNumber === totalQuestions - 1) {
        setQuizCompleted(true); // Đánh dấu hoàn thành bài thi
      }
    } else {
      // Chuyển sang câu tiếp theo hoặc hoàn thành bài thi
      if (questionNumber < totalQuestions - 1) {
        setQuestionNumber((prev) => prev + 1);
        setSelectedAnswer(null); // Reset đáp án
        setIsCorrect(null); // Reset kết quả
        setIsSubmitted(false); // Reset trạng thái
        startTimer(); // Tiếp tục đếm thời gian
      } else {
        pauseTimer(); // Kết thúc đếm giờ
        setQuizCompleted(true); // Đánh dấu hoàn thành bài thi
      }
    }
  };

  useEffect(() => {
    startTimer(); // Bắt đầu đếm giờ khi component mount
    return () => pauseTimer(); // Dừng đồng hồ khi component unmount
  }, []);

  return (
    <div className="quizstarting-container">
      {/* Header */}
      <div className="quizstarting-header">
        <div className="quizstarting-score-container">
          <div className="quizstarting-score">
            <img src={coinIcon} alt="Coin Icon" className="quizstarting-coin-icon" />
            <span>1000</span> {/* Đây là điểm số */}
          </div>
        </div>
        <div className="quizstarting-question-number">
          Câu {questionNumber + 1} trên tổng {totalQuestions} câu
        </div>
      </div>
      <div className="quizstarting-timer-container">
        <div className="quizstarting-timer">{formatTime(timer)}</div>
      </div>

      {/* Question */}
      <div className="quizstarting-question">
        <h2>{questions[questionNumber].question}</h2>
        <p>Hãy chọn một câu trả lời:</p>
      </div>

      {/* Answers */}
      <div className="quizstarting-answers">
        {questions[questionNumber].answers.map((answer, index) => (
          <div
            key={index}
            className={`quizstarting-answer 
              ${selectedAnswer === answer ? 'selected' : ''} 
              ${isSubmitted && answer === questions[questionNumber].correctAnswer ? 'correct' : ''} 
              ${isSubmitted && selectedAnswer === answer && selectedAnswer !== questions[questionNumber].correctAnswer ? 'incorrect' : ''}`}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        className={`quizstarting-submit-button ${isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
        onClick={handleSubmit}
        disabled={!selectedAnswer && !isSubmitted}
      >
        {isSubmitted ? 'Tiếp tục' : 'Kiểm tra'}
      </button>

      {/* Hiển thị ResultCard sau khi bài thi hoàn thành */}
      {quizCompleted && (
        <div className="quizstarting-result-card">
          <ResultCard
            id={id}
            dataType={dataType}
            timer={formatTime(timer)} // Chỉ truyền thời gian
            correctAnswersCount={correctAnswersCount} // Truyền số câu đúng vào ResultCard
            totalQuestions={totalQuestions}
          />
        </div>
      )}
    </div>
  );
};

export default QuizStarting;
