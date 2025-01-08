import React, { useEffect, useState } from 'react';

const Home = () => {
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  // API Key lấy từ biến môi trường
  const apiKey = process.env.REACT_APP_API_KEY;

  // Fetch Quiz Data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('https://your-api-url.com/quiz', {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,  // Sử dụng API key từ môi trường
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          setError("Không thể lấy dữ liệu quiz.");
        }
      } catch (error) {
        setError("Lỗi kết nối với API.");
      } finally {
        setLoadingQuiz(false);
      }
    };

    fetchQuizData();
  }, []);  // Không cần apiKey trong dependency vì nó là cố định

  // Fetch News Data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('https://your-api-url.com/news', {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,  // Sử dụng API key từ môi trường
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        } else {
          setError("Không thể lấy dữ liệu tin tức.");
        }
      } catch (error) {
        setError("Lỗi kết nối với API.");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNewsData();
  }, []);  // Không cần apiKey trong dependency vì nó là cố định

  if (loadingQuiz || loadingNews) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>TESTING.....</h1>
      <ul>
        {quizData.map((quiz, index) => (
          <li key={index}>{quiz.title}</li>
        ))}
      </ul>

      <h1>Tin Tức</h1>
      <ul>
        {newsData.map((news, index) => (
          <div key={item.id} onClick={() => handleNewsClick(item.id, 'userID')}>
                <News
                    title={item.title}
                    description={item.description}
                    banner={item.banner}
                    heartValue={item.heart}
                    commentvalue={item.comment}
                    coinactive={item.coinactive}
                    author={item.name}
                    created_at={item.created_at}
                    status={item.status}
                />
              </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
