import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Setting.css'; // Import CSS
import backIcon from '../components/assets/icons/back.png';
import usdtIcon from '../components/assets/icons/usdt-large.png';
import tduIcon from '../components/assets/icons/tdu.png';
import naptienIcon from '../components/assets/icons/naptien.png';
import ruttienIcon from '../components/assets/icons/ruttien.png';
import acIcon from '../components/assets/icons/coin-header.png';
import bg from '../components/assets/bg-setting.jpg';
import SettingMenu from '../components/Setting-Menu'; // Import ResultCard component

function Setting() {
  const { id } = useParams();

  // Danh sách dữ liệu bài viết
  const newsData = [
    {
      id: 1,
      usdt: 3646,
      tdu: 100000,
      ac: 8050,
      title: "MicroStrategy dùng 561 triệu USD để mua thêm 5.262 BTC",
      description:
        "Tối ngày 23/12/2024, công ty đại chúng MicroStrategy tuyên bố trong 1 tuần vừa qua đã dùng 561 triệu USD tiền mặt để mua thêm 5.262 Bitcoin, với mức giá trung bình 106.662 USD cho mỗi đồng. Giao dịch mua Bitcoin mới nhất của MicroStrategy được thực hiện nhờ khoản tiền bán 1,3 triệu trái phiếu chuyển đổi. Tính đến ngày 23/12, công ty vẫn còn 7,08 tỷ trái phiếu chuyển đổi sẵn sàng để phát hành trong những đợt bán tiếp theo.",
      pic: 'https://danviet.mediacdn.vn/296231569849192448/2022/2/26/2cd40a65-d9fb-471b-9974-b743ef018b46cba80382-16458936467481875622092.jpg',
      name: 'An An',
      time: '15 phút trước',
    },
    // Các bài viết khác
  ];

  const user = newsData.find((item) => item.id === parseInt(id));

  // State để lưu trạng thái hiển thị của từng giá trị
  const [showFullUSDT, setShowFullUSDT] = useState(false);
  const [showFullTDU, setShowFullTDU] = useState(false);
  const [showFullAC, setShowFullAC] = useState(false);

  if (!user) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <div className="setting-detail-container">
      <div className="bannersetting-header">
        <button className="backIcon" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Back Icon" className="backIconImage" />
        </button>
        <img src={bg} alt="Banner" className="bannersetting-image" />
        <div className="avatarsetting-container">
          <img
            src={user.pic} // Sử dụng URL của avatar hoặc ảnh người dùng ở đây
            alt="Avatar"
            className="avatarsetting"
          />
        </div>
      </div>
      <div className="setting-detail-content">
        <div className="setting-detail-row">
          {/* USDT */}
          <div
            className="setting-detail-item"
            onClick={() => setShowFullUSDT((prev) => !prev)}
          >
            <img
              src={usdtIcon}
              alt="Icon"
              className="setting-detail-item-icon"
            />
            <div className="setting-detail-item-text">
              <span className="setting-detail-item-text-small">USDT</span>
              <span className="setting-detail-item-text-large">
                {showFullUSDT ? user.usdt : formatNumber(user.usdt)}
              </span>
            </div>
          </div>

          {/* TDU */}
          <div
            className="setting-detail-item"
            onClick={() => setShowFullTDU((prev) => !prev)}
          >
            <img
              src={tduIcon}
              alt="Icon"
              className="setting-detail-item-icon"
            />
            <div className="setting-detail-item-text">
              <span className="setting-detail-item-text-small">TDU</span>
              <span className="setting-detail-item-text-large">
                {showFullTDU ? user.tdu : formatNumber(user.tdu)}
              </span>
            </div>
          </div>
        </div>
        <div className="setting-detail-row">
          {/* AC */}
          <div
            className="setting-detail-item"
            onClick={() => setShowFullAC((prev) => !prev)}
          >
            <img
              src={acIcon}
              alt="Icon"
              className="setting-detail-item-icon"
            />
            <div className="setting-detail-item-text">
              <span className="setting-detail-item-text-small">AC</span>
              <span className="setting-detail-item-text-large">
                {showFullAC ? user.ac : formatNumber(user.ac)}
              </span>
            </div>
          </div>

          {/* NẠP RÚT */}
          <div
            className="setting-detail-item setting-detail-item-deposit"
          >
            <img
              src={naptienIcon}
              alt="Icon"
              className="setting-coin-icon"
            />
            <div className="setting-detail-item-text setting-detail-item-text-naprut">
              <span className="setting-coin-button">
                Nạp tiền
              </span>
            </div>
          </div>
          <div
            className="setting-detail-item setting-detail-item-withdraw"
          >
            <img
              src={ruttienIcon}
              alt="Icon"
              className="setting-coin-icon"
            />
            <div className="setting-detail-item-text setting-detail-item-text-naprut">
              <span className="setting-coin-button">
                Rút tiền
              </span>
            </div>
          </div>
        </div>
        
        <SettingMenu user={id} className="setting-menu-container"/>
      </div>
    </div>
  );
}

function formatNumber(value) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`; // Hiển thị dạng 'x.xM'
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`; // Hiển thị dạng 'x.xK'
  }
  return value.toString(); // Trả về giá trị gốc nếu nhỏ hơn 1,000
}

export default Setting;
