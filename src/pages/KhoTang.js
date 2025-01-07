import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Đảm bảo đã nhập useNavigate

import Header from "../components/Header";
import News from "../components/News";
import TadaTV from "../components/TadaTV";
import Course from "../components/Course";
import Footer from "../components/Footer";
import "./KhoTang.css";

function KhoTang() {
  const [activeTab, setActiveTab] = useState('tintuc'); // Tab đang chọn
  const [activedataType, setActivedataType] = useState('All'); // Loại dữ liệu đang chọn
  const [dataType, setDataType] = useState('news'); // Loại dữ liệu: news, tv, khoahoc

  const navigate = useNavigate(); // Khai báo navigate

  const handleNewsClick = (id) => {
    if (dataType === 'news') {
      navigate(`/news/${id}`);
    } else if (dataType === 'tadatv') {
      navigate(`/tadatv/${id}`);
    } else if (dataType === 'course') {
      navigate(`/course/${id}`);
    }
  };

  // Dữ liệu ví dụ cho news, tv, khoahoc
  const newsData = [
    {
      id: 1,
      dataType: "Crypto",
      title: "Theoriq là gì? Cơ sở hạ tầng cho multi-Agent AI",
      pic: "https://cdn.coin68.com/images/20241221081959-53d146c4-4bfd-4a4b-a865-01ac5fcbcf2e-68.jpg",
      description: "Theoriq là giao thức phi tập trung kết hợp giữa trí tuệ nhân tạo và công nghệ blockchain để xây dựng một hệ sinh thái...",
      heartValue: 7830,
      commentValue: 18830,
      coinactive: 50,
      name: 'An An',
      time: '26 phút trước',
      status: 1
    },
    {
      id: 2,
      dataType: "Goods",
      title: "Hàng loạt công ty crypto quyên góp triệu USD để tài trợ cho lễ nhậm chức của Trump",
      pic: "https://cdn.coin68.com/images/20241221032554-d96e3d78-56ae-4706-81d5-d93fba061bcb-11.jpg",
      description: "Kraken, Ripple, Ondo Finance, Coinbase, Moonpay quyên...",
      heartValue: 8530,
      commentValue: 64232,
      coinactive: 50,
      name: 'An An',
      time: '18 giờ trước',
      status: 0
    },
    {
      id: 3,
      dataType: "Forex",
      title: "Forex market update: Key trends to watch",
      pic: "https://cdn.coin68.com/images/20241219143415-cf8f85e4-ab02-47f2-9f91-b8a4b9ed5005-145.jpg",
      description: "Overview of the latest trends in the forex market.",
      heartValue: 6200,
      commentValue: 2534,
      coinactive: 50,
      status: 0,
      name: 'An An',
      time: '19 giờ trước',
    },
  ];

  const tvData = [
    { id: 1, 
      dataType: 'CFD', 
      title: 'BTC sập hầm sau khi Fed giảm lãi suất, Powell khẳng định Fed không thể sở hữu Bitcoin', 
      pic: 'https://cdn.coin68.com/images/20241219015205-2006ec6a-402f-4037-ba89-756aa38117b4-74.jpg',
      heartValue:'1467',
      commentValue:'46347',
      coinactive:'100',
      name: 'An An',
      time: '25 phút trước',
      status: 1
    },
    { id: 2, 
      dataType: 'Crypto', 
      title: 'Loạt token pump-dump sau sự cố Binance đăng nhầm link Telegram', 
      pic: 'https://cdn.coin68.com/images/20241218082732-8da08f5f-bfb6-4205-9787-6c3b1f422c81-198.jpg',
      heartValue:'1467',
      commentValue:'46347',
      coinactive:'100',
      name: 'An An',
      time: '1 ngày trước',
      status: 0
    },
  ];

  const courseData = [
    { id: 1,
      title: 'AI for Beginners', 
      description: 'Các bot giao dịch có thể tự động hóa giao dịch tiền điện tử của bạn để tận dụng tối đa thị trường tiền điện tử đầy biến động 24/7.',
      pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEur4Oy_QsyYwm1mwsKF9O553Fn8RQxImvg&s',
      coinactive:'250',
      completion:'40',
      status: 1
    },
    { id: 2,
      title: 'Bồi dưỡng kiến thức quản lý kinh tế và tài chính', 
      description: 'Mở và quản lý tài khoản, kiểm soát chi ngân sách nhà nước qua Kho bạc. – Tài chính các đơn vị có sử dụng kinh phí ngân sách nhà nước và đơn',
      pic: 'https://i.ytimg.com/vi/FFuYA55Ga7s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBrLO-V3cRgHrE1kPwnLTmDvs5z6A',
      coinactive:'250',
      completion:'80',
      status: 0
    },
  ];

  const handleTabClick = (tab, type) => {
    setActiveTab(tab);
    setDataType(type);
    setActivedataType('All'); // Reset dataType khi đổi tab
  };

  const handledataTypeClick = (dataType) => {
    setActivedataType(dataType);
  };

  const filteredData = (dataType === 'news' ? newsData : (dataType === 'tadatv' ? tvData : courseData)).filter(item =>
    activedataType === 'All' || item.dataType === activedataType
  );

  return (
    <div className="App">
      <Header />
      <main>
        <div className="tab-menu">
          <button
            className={`btn_tintuc ${activeTab === 'tintuc' ? 'active' : ''}`}
            onClick={() => handleTabClick('tintuc', 'news')}
          >
            Tin tức
          </button>
          <button
            className={`btn_tadatv ${activeTab === 'tadatv' ? 'active' : ''}`}
            onClick={() => handleTabClick('tadatv', 'tadatv')}
          >
            TadaTV
          </button>
          <button
            className={`btn_khoahoc ${activeTab === 'khoahoc' ? 'active' : ''}`}
            onClick={() => handleTabClick('khoahoc', 'course')}
          >
            Khóa học
          </button>
        </div>
        {(dataType === 'news' || dataType === 'tadatv') && (
          <div className="menunews-container">
            <div 
              className={`menunews-item ${activedataType === 'All' ? 'active' : ''}`} 
              onClick={() => handledataTypeClick('All')}
            >
              All
            </div>
            <div 
              className={`menunews-item ${activedataType === 'Crypto' ? 'active' : ''}`} 
              onClick={() => handledataTypeClick('Crypto')}
            >
              Crypto
            </div>
            <div 
              className={`menunews-item ${activedataType === 'Forex' ? 'active' : ''}`} 
              onClick={() => handledataTypeClick('Forex')}
            >
              Forex
            </div>
            <div 
              className={`menunews-item ${activedataType === 'Goods' ? 'active' : ''}`} 
              onClick={() => handledataTypeClick('Goods')}
            >
              Goods
            </div>
            <div 
              className={`menunews-item ${activedataType === 'CFD' ? 'active' : ''}`} 
              onClick={() => handledataTypeClick('CFD')}
            >
              CFD
            </div>
          </div>
        )}
        <div className="content-container">
          {filteredData.map(item => {
            if (dataType === 'news') {
              return (
                <div key={item.id} onClick={() => handleNewsClick(item.id)}>
                  <News
                    title={item.title}
                    description={item.description}
                    pic={item.pic}
                    heartValue={item.heartValue}
                    commentValue={item.commentValue}
                    coinactive={item.coinactive}
                    name={item.name}
                    time={item.time}
                    status={item.status}
                  />
                </div>
              );
            } else if (dataType === 'tadatv') {
              return (
                <div key={item.id} onClick={() => handleNewsClick(item.id)}>
                 <TadaTV
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  pic={item.pic}
                  heartValue={item.heartValue}
                  commentValue={item.commentValue}
                  coinactive={item.coinactive}
                  name={item.name}
                  time={item.time}
                  status={item.status}
                />
                </div>                
              );
            } else if (dataType === 'course') {
              return (
                <div key={item.id} onClick={() => handleNewsClick(item.id)}>
                 <Course
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  pic={item.pic}
                  coinactive={item.coinactive}
                  completion={item.completion}
                  status={item.status}
                />
                </div>                  
              );
            }
            return null;
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default KhoTang;
