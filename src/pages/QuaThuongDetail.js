import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './NewsDetail.css'; // Import CSS
import sharingIcon from '../components/assets/icons/sharing.png';
import backIcon from '../components/assets/icons/back.png';
import CharityInfo from '../components/Charity-Info';
import GiftInfo from '../components/Gift-Info';
import CharityRank from '../components/Charity-Rank';
import GiftRules from '../components/Gift-Rules';
import CharityStart from '../components/Charity-Start';
import GiftStart from '../components/Gift-Start';
import activecoinIcon from '../components/assets/icons/coin-active.png';
import usdtIcon from '../components/assets/icons/usdt.png';

function QuaThuongDetail() {
  const { id } = useParams(); // Hứng `id` từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataTypeFromUrl = queryParams.get('dataType'); // Lấy `dataType` từ query string trong URL

  // Dữ liệu bài viết
  const newsData = [
    {
      id: 1,
      dataType: 'tuthien', 
      title: 'Học bổng khuyến học trẻ em vùng cao', 
      description: 'Trẻ em vùng cao sẽ có thêm điều kiện đến trường từ mỗi lượt thử thách đấu trường của bạn.',
      pic: 'https://mytourcdn.com/upload_images/Image/Minh%20Hoang/Tay%20bac/tre%20em/1.jpg',
      value: 10000,
      completion: 6852,
      members: 4891,
      gift_title: 'MỤC TIÊU QUYÊN GÓP',
      avatar1: 'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/10/1/ca-si-thuy-tien8-1696134384983166107603-205-0-1455-2000-crop-16961355019131767382141.jpg',
      avatar2: 'https://t.ex-cdn.com/vietnamfinance.vn/960w/files/f1/news/hoaithuong/2022/2/23/vnf-linh-vlogs-1.jpeg',
      avatar3: 'https://thanhnien.mediacdn.vn/Uploaded/thynhm/2022_08_30/thuy-tien-3558.jpg',
      avatar4: 'https://vnn-imgs-f.vgcloud.vn/2021/01/21/08/thieu-bao-tram-la-ai-10.jpg',
      charitytitle:'Sở Giáo dục & Đào tạo tỉnh Lạng Sơn',
      listCharity: [
        {
          name: 'Hải Tú',
          avatar: 'https://cdnphoto.dantri.com.vn/HwMMbhcJ_sLBod6e9UkplU3i1c8=/thumb_w/1020/2024/03/11/haitu12-edited-1710125677646.jpeg',
          amount: '200 USDT'
        },
        {
          name: 'Trương Quỳnh Anh',
          avatar: 'https://phunuvietnam.mediacdn.vn/thumb_w/700/179072216278405120/2023/1/13/305211937-6222219097793877-7422634245535535123-n-16735919383132145732554-442-0-1385-1509-crop-16735919558141508518608.jpg',
          amount: '150 USDT'
        },
        {
          name: 'Hiền Hồ',
          avatar: 'https://nld.mediacdn.vn/291774122806476800/2022/4/19/n-ho-di-show-chan-dai-toi-nach-nhung-mat-do-cung-hien-ho-toi-do-nhat-nhung-khong-vo-duyen-98fe21-ve-1639984218-310-width1017height1482-11113367-1650361452542454885009.jpg',
          amount: '100 USDT'
        },
        {
          name: 'Thành Long',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUINbLNmxGH694dECt-JpEZV-BftfvtbClg&s',
          amount: '70 USDT'
        },
        {
          name: 'Elle Fanning',
          avatar: 'https://media.glamour.com/photos/668d5256d5ff90e184571221/master/w_2560%2Cc_limit/GettyImages-1456771335.jpg',
          amount: '60 USDT'
        }
      ]
    },
    {
      id: 2,
    dataType: 'doithuong', 
    title: 'Voucher mua hàng tại TGDĐ', 
    description: 'Tưng bừng mua sắp với voucher trị giá 2 triệu đồng từ TheGioiDiDong.com dành riêng cho thành viên TadaUp. Nhận ngay hôm nay!!!',
    pic: 'https://cdn.tgdd.vn/Files/2020/12/22/1315495/thegioididongdienmayxanh_800x450.jpg',
    avatar1: 'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/10/1/ca-si-thuy-tien8-1696134384983166107603-205-0-1455-2000-crop-16961355019131767382141.jpg',
      avatar2: 'https://t.ex-cdn.com/vietnamfinance.vn/960w/files/f1/news/hoaithuong/2022/2/23/vnf-linh-vlogs-1.jpeg',
      avatar3: 'https://thanhnien.mediacdn.vn/Uploaded/thynhm/2022_08_30/thuy-tien-3558.jpg',
      avatar4: 'https://vnn-imgs-f.vgcloud.vn/2021/01/21/08/thieu-bao-tram-la-ai-10.jpg',
    gift_title: 'ĐỔI VỚI',
    members: 2354,
    value: 5000,
    amount: 346, 
    charitytitle:'Công ty CP Thế Giới Di Động',
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
        <img src={quiz.pic} alt="Banner" className="banner-image" />
      </div>
      <div className="news-detail-content">
        {dataTypeFromUrl === 'tuthien' ? (
          // Nội dung khi dataType là "tuthien"
          <>
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

            <div className="status-charity">
              <div className="status-line">
                <div className="status-background"></div>
                <div
                  className="status-progress"
                  style={{ width: `${(quiz.completion / quiz.value) * 100}%` }}>
                </div>
                <span
                  className="charity-status-text"
                  style={{ left: `${(quiz.completion / quiz.value) * 100}%`, top: '-25px' }}>
                  {quiz.completion}
                </span>
              </div>
              <div className="quiz-footer">
                <span className="total">{quiz.gift_title}</span>
                <span className="charity-value-icon">
                  <img src={usdtIcon} alt="USDT Icon" className="usdt-icon" />
                  {quiz.value} USDT
                </span>
              </div>
            </div>

            <CharityInfo quiz={quiz} />
            <div className="QuizRank">
              <span className="quiz-subtitle">Thành viên đóng góp tiêu biểu</span>
              <CharityRank quiz={quiz} />
            </div>
            <CharityStart quiz={quiz} />
          </>
        ) : dataTypeFromUrl === 'doithuong' ? (
          // Nội dung khi dataType là "doithuong"
          <>
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

          <div className="status-charity">
            <div className="quiz-footer">
              <span className="total">{quiz.gift_title}</span>
              <span className="charity-value-icon">
                <img src={activecoinIcon} alt="USDT Icon" className="usdt-icon" />
                {quiz.value}
              </span>
            </div>
          </div>

          <GiftInfo quiz={quiz} />
          <div className="QuizRules">
          <GiftRules quiz={quiz} />
        </div>         
          <GiftStart quiz={quiz} />
        </>
        ) : (
          // Nội dung khi không phải "tuthien" hoặc "doithuong"
          <>
            <h2 className="quiz-detail-title">{quiz.title} - Nội dung đặc biệt</h2>
            <p>Loại bài viết không xác định hoặc chưa được hỗ trợ.</p>
          </>
        )}
      </div>
    </div>
  );
}


export default QuaThuongDetail;
