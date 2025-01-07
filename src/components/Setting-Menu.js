import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import nextIcon from '../components/assets/icons/next.png'; // Đảm bảo đường dẫn đúng
import hosoIcon from '../components/assets/icons/setting-hoso.png'; // Đảm bảo đường dẫn đúng
import lichsunaprutIcon from '../components/assets/icons/setting-lichsunaprut.png'; // Đảm bảo đường dẫn đúng
import dieukhoansudungIcon from '../components/assets/icons/setting-dieukhoansudung.png'; // Đảm bảo đường dẫn đúng
import ngonnguIcon from '../components/assets/icons/setting-ngonngu.png'; // Đảm bảo đường dẫn đúng
import "./Setting-Menu.css";

function SettingMenu({ user }) {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

  // Hàm xử lý khi nhấn nút
  const handleNavigate = () => {
    // Điều hướng tới trang chi tiết quiz (thay đổi đường dẫn tùy vào yêu cầu)
    navigate(`/setting/${user.id}?dataType=${user.dataType}`);
  };

  return (
    <div className="menu-container">
      <div className="menu-item">
        {/* Button với icon và tiêu đề */}
        <button className="menu-button" onClick={handleNavigate}>
          <img src={hosoIcon} alt="icon" className="icon-left" />
          <span>Hồ sơ</span>
          <div className="icon-right">
            <img src={nextIcon} alt="arrow" className="arrow-icon" />
          </div>
        </button>
      </div>
      {/* Đường phân chia */}
      <div className="divider"></div>
      {/* Phần Button */}
      <div className="menu-item">
        {/* Lịch sử nạp rút */}
        <button className="menu-button" onClick={handleNavigate}>
          <img src={lichsunaprutIcon} alt="icon" className="icon-left" />
          <span>Lịch sử nạp rút</span>
          <div className="icon-right">
            <img src={nextIcon} alt="arrow" className="arrow-icon" />
          </div>
        </button>
      </div>
      <div className="divider"></div>
      {/* Phần Button */}
      <div className="menu-item">
        {/* Button với icon và tiêu đề */}
        <button className="menu-button" onClick={handleNavigate}>
          <img src={ngonnguIcon} alt="icon" className="icon-left" />
          <span>Ngôn ngữ</span>
          <div className="icon-right">
            <img src={nextIcon} alt="arrow" className="arrow-icon" />
          </div>
        </button>
      </div>
      <div className="divider"></div>
      {/* Phần Button */}
      <div className="menu-item">
        {/* Button với icon và tiêu đề */}
        <button className="menu-button" onClick={handleNavigate}>
          <img src={dieukhoansudungIcon} alt="icon" className="icon-left" />
          <span>Điều khoản sử dụng</span>
          <div className="icon-right">
            <img src={nextIcon} alt="arrow" className="arrow-icon" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default SettingMenu;
