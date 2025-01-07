import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './NewsDetail.css'; // Import CSS
import sharingIcon from '../components/assets/icons/sharing.png';
import backIcon from '../components/assets/icons/back.png';
import QuizInfo from '../components/Quiz-Info';
import QuizRank from '../components/Quiz-Rank';
import QuizRules from '../components/Quiz-Rules';
import QuizResult from '../components/Quiz-Result';
import QuizStart from '../components/Quiz-Start';

function QuizDetail() {
  const { id } = useParams(); // Hứng `id` từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataTypeFromUrl = queryParams.get('dataType'); // Lấy `dataType` từ query string trong URL

  // Dữ liệu bài viết
  const newsData = [
    {
        id: 1,
        dataType: "TDU",
        title: "Quiz Learn: Tài chính cơ sở",
        description: "Tham gia thử sức kiến thức của mình về tài chính cơ sở cùng cộng đồng TadaUp để nhận phần thưởng hấp dẫn mỗi ngày. Đừng quên bổ sung kiến thức nền tảng vững chắc trước khi tham gia để có thật nhiều câu trả lời chính xác và nhanh nhất.",
        pic: "https://www.berlinsbi.com/uploads/sites/2/2021/12/7-very-good-reasons-to-do-master-s-in-finance.jpg",
        value: "50",
        resultTime: '0:65:256',
        correctAnswers: '8/10',
        knowleagelink: '#',
        knowleagetitle: 'Kiến thức cơ bản về tài chính cơ sở',
        avatar1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8x0ee4fgYxGx_IIofSYK8qCImoimqWKVjA&s",
        avatar2: "https://i.scdn.co/image/ab6761610000e5eb653268b19c265e835504190e",
        avatar3: "https://vcdn1-giaitri.vnecdn.net/2024/07/05/ca-si-phuong-linh-1720168809-1-5452-7217-1720169102.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=fWeWTaPCEXOjzAY194qrxA",
        avatar4: "https://image.anninhthudo.vn/1200x630/Uploaded/2024/abhusbb/2023_05_13/dam-linh-3-7883.jpg",
        winner1_name: "Hải Tú",
        winner1: "https://cdnphoto.dantri.com.vn/HwMMbhcJ_sLBod6e9UkplU3i1c8=/thumb_w/1020/2024/03/11/haitu12-edited-1710125677646.jpeg",
        winner1_timer: '0:33:179',
        winner2_name: "Trương Quỳnh Anh",
        winner2: "https://phunuvietnam.mediacdn.vn/thumb_w/700/179072216278405120/2023/1/13/305211937-6222219097793877-7422634245535535123-n-16735919383132145732554-442-0-1385-1509-crop-16735919558141508518608.jpg",
        winner2_timer: '0:39:784',
        winner3_name: "Hiền Hồ",
        winner3: "https://nld.mediacdn.vn/291774122806476800/2022/4/19/n-ho-di-show-chan-dai-toi-nach-nhung-mat-do-cung-hien-ho-toi-do-nhat-nhung-khong-vo-duyen-98fe21-ve-1639984218-310-width1017height1482-11113367-1650361452542454885009.jpg",
        winner3_timer: '0:45:356',
        members: "+ 12520",
        gift_title: "GIẢI THƯỞNG",
        status: 0, // Thay đổi giá trị này để kiểm tra
        Rules: [
            {
                rule: "Mỗi câu trả lời đúng sẽ được cộng điểm.",
                description: "Người chơi cần trả lời chính xác để tích lũy điểm cao hơn."
            },
            {
                rule: "Thời gian trả lời bị giới hạn.",
                description: "Người chơi phải hoàn thành câu hỏi trong thời gian quy định."
            },
            {
                rule: "Chỉ có một cơ hội trả lời cho mỗi câu hỏi.",
                description: "Nếu trả lời sai, bạn sẽ không thể quay lại câu hỏi này."
            }
        ]
    },
    // Các bài viết khác
  ];

  // Tìm quiz theo ID
  const quiz = newsData.find((item) => item.id === parseInt(id) && item.dataType === dataTypeFromUrl);

  if (!quiz) {
    return <div>Không tìm thấy bài viết</div>;
  }

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(quiz.title)}`;

  return (
    <div className="news-detail-container">
      <div className="banner-header">
        <button className="backIcon" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Back Icon" className="backIconImage" />
        </button>
        <img
          src={quiz.pic}
          alt="Banner"
          className="banner-image"
        />
      </div>
      <div className="news-detail-content">
        <h2 className="quiz-detail-title">{quiz.title}</h2>
        <div className="name-time-container">
          <div className="players">
            <div className="avatar-container">
              <div className="avatar" style={{ backgroundImage: `url(${quiz.avatar1})` }}></div>
              <div className="avatar" style={{ backgroundImage: `url(${quiz.avatar2})` }}></div>
              <div className="avatar" style={{ backgroundImage: `url(${quiz.avatar3})` }}></div>
              <div className="avatar" style={{ backgroundImage: `url(${quiz.avatar4})` }}></div>
            </div>
            {quiz.members}
          </div>
          <div className="share-icon-news">
            <a href={telegramShareUrl} target="_blank" rel="noopener noreferrer" className="share-link">
              <span>Chia sẻ</span>
              <img src={sharingIcon} alt="Share Icon" className="share-icon" />
            </a>
          </div>
        </div>

        {/* Kiểm tra status trước khi hiển thị QuizResult */}
        {quiz.status === 0 && <QuizResult quiz={quiz} />} 
        
        <QuizInfo quiz={quiz} />
        
        <div className="QuizRank">
          <span className="quiz-subtitle">Bảng xếp hạng</span>
          <QuizRank quiz={quiz} />
        </div>
        <div className="QuizRules">
          <QuizRules quiz={quiz} />
        </div>
        <QuizStart quiz={quiz} />
      </div>
    </div>
  );
}

export default QuizDetail;
