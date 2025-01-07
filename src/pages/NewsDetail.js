import React from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css'; // Import CSS
import sharingIcon from '../components/assets/icons/sharing.png';
import backIcon from '../components/assets/icons/back.png';
import socialIcon from '../components/assets/icons/social.png';  // Import icon

function NewsDetail() {
  const { id } = useParams();

  // Danh sách dữ liệu bài viết
  const newsData = [
    {
      id: 1,
      dataType: "Crypto",
      title: "MicroStrategy dùng 561 triệu USD để mua thêm 5.262 BTC",
      description: "Tối ngày 23/12/2024, công ty đại chúng MicroStrategy tuyên bố trong 1 tuần vừa qua đã dùng 561 triệu USD tiền mặt để mua thêm 5.262 Bitcoin, với mức giá trung bình 106.662 USD cho mỗi đồng. Giao dịch mua Bitcoin mới nhất của MicroStrategy được thực hiện nhờ khoản tiền bán 1,3 triệu trái phiếu chuyển đổi. Tính đến ngày 23/12, công ty vẫn còn 7,08 tỷ trái phiếu chuyển đổi sẵn sàng để phát hành trong những đợt bán tiếp theo.",
      pic: 'https://cdn.coin68.com/images/20241223132834-32c0c5c9-ca14-4ace-892f-e2b69197c86e-91.jpg',
      name: 'An An',
      time: '15 phút trước'
    },
    // Các bài viết khác
  ];

  const news = newsData.find(item => item.id === parseInt(id));

  if (!news) {
    return <div>Không tìm thấy bài viết</div>;
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
