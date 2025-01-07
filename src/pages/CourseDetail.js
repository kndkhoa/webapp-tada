import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css'; // Import CSS
import sharingIcon from '../components/assets/icons/sharing.png';
import backIcon from '../components/assets/icons/back.png';

function NewsDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('tientrinh'); // Tab mặc định
  const [dataType, setDataType] = useState('tientrinh'); // Kiểu dữ liệu hiện tại

  // Danh sách dữ liệu bài viết, bao gồm mảng các bước tiến độ
  const newsData = [
    {
      id: 1,
      title: "Thiết kế & Triển khai Hệ thống BOT Auto Trading - Algo Trading",
      description: "Theo thống kê của VSDC, đến tháng 10/2024, số lượng tài khoản giao dịch chứng khoán tại Việt Nam đã vượt 8,8 triệu, tương đương 9,6% dân số. Điều này phản ánh sự quan tâm ngày càng tăng của người dân đối với đầu tư chứng khoán như một phương tiện để gia tăng thu nhập và đa dạng hóa danh mục đầu tư. Sự phát triển của công nghệ học máy (Machine Learning) đã tạo ra một bước chuyển đổi trong phương pháp đầu tư. Thay vì dựa vào phân tích truyền thống và trực giác cá nhân, các nhà đầu tư ngày nay đang áp dụng các mô hình đầu tư dựa trên dữ liệu và thuật toán.",
      pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmg3VidA3YasrPNN1MJkA1IzE4Q-tx-ZE2mA&s',
      trainer: 'https://cdnmedia.baotintuc.vn/Upload/G5r0l6AdtRt8AnPUeQGMA/files/2024/09/0909/090924-musk.jpg',
      name: 'Elon Musk',
      amount: 20,
      avatar1: "https://danviet.mediacdn.vn/296231569849192448/2023/10/25/fan-bingbing-1698233964355563252205.jpg",
      avatar2: "https://image.viettimes.vn/w800/Uploaded/2024/bpcivpwi/2021_08_31/nghe-si-trieu-vy-7296.jpg",
      avatar3: "https://photo.znews.vn/w660/Uploaded/wpdhnwhnw/2024_06_24/luu.jpg",
      avatar4: "https://2sao.vietnamnetjsc.vn/images/2020/04/08/17/05/lytieulo-1.jpg",
      members: "+ 2550",
      steps: [
        {
          progress: 100,
          steptitle: 'Chương 1',
          stepdetail: 'Nhập môn chương trình',
          steptime: '30 phút'
        },
        {
          progress: 50,
          steptitle: 'Chương 2',
          stepdetail: 'Nhập môn chương trình',
          steptime: '45 phút'
        },
        {
          progress: 5,
          steptitle: 'Chương 3',
          stepdetail: 'Nhập môn chương trình',
          steptime: '60 phút'
        },
        {
          progress: 0,
          steptitle: 'Chương 4',
          stepdetail: 'Nhập môn chương trình',
          steptime: '60 phút'
        },
        // Thêm các bước khác nếu có
      ]
    },
    // Các bài viết khác
  ];

  const course = newsData.find((item) => item.id === parseInt(id));

  const handleTabClick = (tab, type) => {
    setActiveTab(tab);
    setDataType(type);
  };

  if (!course) {
    return <div>Không tìm thấy bài viết</div>;
  }

  // URL chia sẻ trên Telegram
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(course.title)}`;

  // URL dẫn đến kênh Telegram
  const telegramChannelUrl = 'https://t.me/tadaup'; // Thay "your_channel" bằng tên kênh Telegram của anh

  return (
    <div className="news-detail-container">
      <div className="banner-header">
        <button className="backIcon" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Back Icon" className="backIconImage" />
        </button>
        <img src={course.pic} alt="Banner" className="banner-image" />
        <h2 className="banner-title">{course.title}</h2> {/* Tiêu đề hiển thị ở đây */}
        <div className="banner-info">
          <img src={course.trainer} alt="Icon" className="banner-info-icon" />
          <span className="banner-info-text">{course.name}</span>
        </div>
      </div>
      <div className="news-detail-content">
        <div className="tab-menu-course">
          <div className="tab-menu">
            <button
              className={`btn_tientrinh ${activeTab === 'tientrinh' ? 'active' : ''}`}
              onClick={() => handleTabClick('tientrinh', 'tientrinh')}
            >
              Tiến trình
            </button>
            <button
              className={`btn_thaoluan ${activeTab === 'thaoluan' ? 'active' : ''}`}
              onClick={() => handleTabClick('thaoluan', 'thaoluan')}
            >
              Thảo luận
            </button>
          </div>
        </div>
        {/* Hiển thị title và description nếu dataType là 'tientrinh' */}
        {dataType === 'tientrinh' && (
          <>
            <div className="name-time-container">
              <div className="players">
                <div className="avatar-container">
                  <div className="avatar" style={{ backgroundImage: `url(${course.avatar1})` }}></div>
                  <div className="avatar" style={{ backgroundImage: `url(${course.avatar2})` }}></div>
                  <div className="avatar" style={{ backgroundImage: `url(${course.avatar3})` }}></div>
                  <div className="avatar" style={{ backgroundImage: `url(${course.avatar4})` }}></div>
                </div>
                {course.members}
              </div>
              <div className="share-icon-news">
                <a href={telegramShareUrl} target="_blank" rel="noopener noreferrer" className="share-link">
                  <span>Chia sẻ</span>
                  <img src={sharingIcon} alt="Share Icon" className="share-icon" />
                </a>
              </div>
            </div>
            <p className="content-news">{course.description}</p>
            {/* Hiển thị tiến độ cho từng bước */}
        <div className="course-progress-container">
          {course.steps.map((step, index) => (
            <div key={index} className="course-step">
              <div className="course-circle-container">
                <svg className="course-circle" viewBox="0 0 36 36" width="80" height="80">
                  <path
                    className="course-circle-background"
                    d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
            className="course-circle-progress"
            d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
            fill="none"
            stroke="#4caf50"
            strokeWidth="3"
            strokeDasharray="100, 100"
            strokeDashoffset={100 - step.progress} // Sử dụng progress từ từng bước
          />
        </svg>
        <div className="course-circle-text">
          <div className="course-percentage">{step.progress}%</div>
        </div>
      </div>
      <div className="course-text-container">
        <div className="course-title">{step.steptitle}</div>
        <div className="course-description">{step.stepdetail}</div>
        <div className="course-time">{step.steptime}</div>
      </div>
    </div>
  ))}
</div>
          </>
        )}
        

      </div>
    </div>
  );
}

export default NewsDetail;
