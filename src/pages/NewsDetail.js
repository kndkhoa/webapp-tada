import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css'; // Import CSS
import sharingIcon from '../components/assets/icons/sharing.png';
import backIcon from '../components/assets/icons/back.png';
import socialIcon from '../components/assets/icons/social.png';  // Import icon

function NewsDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [news, setNews] = useState(null); // State lưu dữ liệu bài viết
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://admin.tducoin.com/api/news/${id}`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu');
        }

        const data = await response.json();
        setNews(data); // Cập nhật dữ liệu bài viết
      } catch (error) {
        console.error('Lỗi:', error);
        setNews(null); // Nếu có lỗi thì gán lại là null
      } finally {
        setLoading(false); // Đã tải xong dữ liệu
      }
    };

    fetchData(); // Gọi API khi component được render
  }, [id]); // Mỗi khi id thay đổi sẽ gọi lại API

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (!news) {
    return <div>Không tìm thấy bài viết</div>; // Nếu không có dữ liệu
  }

  // URL chia sẻ trên Telegram
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`;

  // URL dẫn đến kênh Telegram
  const telegramChannelUrl = "https://t.me/tadaup"; // Thay "your_channel" bằng tên kênh Telegram của anh

  return (
    <div className="news-detail-container">
      <div className="banner-header">
        <button className="backIcon" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Back Icon" className="backIconImage" />
        </button>
        <img
          src={news.pic}
          alt="Banner"
          className="banner-image"
        />
      </div>
      <div className="news-detail-content">
        <h2>{news.title}</h2>
        <div className="name-time-container">
          <p className="name-time">{news.name} - {news.time}</p>
          <div className="share-icon-news">
            <a href={telegramShareUrl} target="_blank" rel="noopener noreferrer" className="share-link">
              <span>Chia sẻ</span>
              <img src={sharingIcon} alt="Share Icon" className="share-icon" />
            </a>
          </div>
        </div>
        <p className='content-news'>{news.description}</p>

        {/* Nút dẫn đến kênh Telegram */}
        <div className="telegram-channel-link">
          <a href={telegramChannelUrl} target="_blank" rel="noopener noreferrer" className="go-to-telegram-button">
            <img src={socialIcon} alt="Social Icon" className="social-icon" /> {/* Icon */}
            Kênh thảo luận
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
