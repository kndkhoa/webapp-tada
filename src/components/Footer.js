import homeIcon1 from './assets/icons/trang-chu-1.png';
import homeIcon2 from './assets/icons/trang-chu-2.png';
import bookIcon1 from './assets/icons/kho-tang-1.png';
import bookIcon2 from './assets/icons/kho-tang-2.png';
import trophyIcon1 from './assets/icons/dau-truong-1.png';
import trophyIcon2 from './assets/icons/dau-truong-2.png';
import giftIcon1 from './assets/icons/qua-thuong-1.png';
import giftIcon2 from './assets/icons/qua-thuong-2.png';
import './Footer.css'; // Tùy chỉnh CSS nếu cần

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Hàm lấy icon cho từng đường dẫn
  const getIconForPath = (path) => {
    switch (path) {
      case '/':
      case '/home':
        return homeIcon1;
      case '/khotang':
        return bookIcon1;
      case '/dautruong':
        return trophyIcon1;
      case '/quathuong':
        return giftIcon1;
      default:
        return homeIcon2; // Nếu không khớp với bất kỳ đường dẫn nào, dùng icon mặc định
    }
  };

  // Cập nhật icon khi đường dẫn thay đổi
  useEffect(() => {
    // Chỉ cần gọi lại hàm khi `location.pathname` thay đổi, không cần update thêm trạng thái khác.
  }, [location.pathname]);

  return (
    <footer className="footer">
      <Link to="/" className="footer-button">
        <img 
          src={location.pathname === '/home' ? homeIcon1 : homeIcon2}  
          alt="Trang chủ" 
          className="icon" 
        />
        <span>Trang chủ</span>
      </Link>
      <Link to="/khotang" className="footer-button">
        <img 
          src={location.pathname === '/khotang' ? bookIcon1 : bookIcon2} 
          alt="Kho tàng" 
          className="icon" 
        />
        <span>Kho tàng</span>
      </Link>
      <Link to="/dautruong" className="footer-button">
        <img 
          src={location.pathname === '/dautruong' ? trophyIcon1 : trophyIcon2} 
          alt="Đấu trường" 
          className="icon" 
        />
        <span>Đấu trường</span>
      </Link>
      <Link to="/quathuong" className="footer-button">
        <img 
          src={location.pathname === '/quathuong' ? giftIcon1 : giftIcon2} 
          alt="Quà thưởng" 
          className="icon" 
        />
        <span>Quà thưởng</span>
      </Link>
    </footer>
  );
};

export default Footer;
