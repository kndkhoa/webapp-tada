import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import News from "../components/News";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./Home.css";
import avatar from '../components/assets/avatar.gif';

// Dữ liệu item với dataType
const quizData = [
  {
    id: 1,
    menu: 'quiz',
    highlight: 1,
    title: "item Lott: Tư duy tài chính",
    dataType: 'USDT',
    description: "Khám phá xem mình có phải là người có tư duy tài chính tốt không và cơ hội nhận thưởng lớn.",
    pic: "https://regionalneurological.com/wp-content/uploads/2020/03/Regional-Neurological_Brain-Science.jpeg",
    value: "12,020",
    timer: "Sẽ kết thúc trong 16h",
    avatar1: "https://danviet.mediacdn.vn/296231569849192448/2023/10/25/fan-bingbing-1698233964355563252205.jpg",
    avatar2: "https://image.viettimes.vn/w800/Uploaded/2024/bpcivpwi/2021_08_31/nghe-si-trieu-vy-7296.jpg",
    avatar3: "https://photo.znews.vn/w660/Uploaded/wpdhnwhnw/2024_06_24/luu.jpg",
    avatar4: "https://2sao.vietnamnetjsc.vn/images/2020/04/08/17/05/lytieulo-1.jpg",
    members: "+ 2550",
    gift_title: "TỔNG GIÁ TRỊ",
    status: 1
  },
  {
    id: 2,
    highlight: 1,
    menu: 'quiz',
    dataType: 'USDT',
    title: "item 1vs1: Độ hiểu biết nến Nhật",
    description: "Thể hiện sự hiểu biết về các mô hình nến Nhật.",
    pic: "https://optiver.com/wp-content/uploads/2023/11/AdobeStock_604288309-scaled.jpeg",
    value: "10",
    timer: "Bắt đầu trong 3d",
    completed: true,
    avatar1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8x0ee4fgYxGx_IIofSYK8qCImoimqWKVjA&s",
    avatar2: "https://i.scdn.co/image/ab6761610000e5eb653268b19c265e835504190e",
    avatar3: "https://vcdn1-giaitri.vnecdn.net/2024/07/05/ca-si-phuong-linh-1720168809-1-5452-7217-1720169102.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=fWeWTaPCEXOjzAY194qrxA",
    avatar4: "https://image.anninhthudo.vn/1200x630/Uploaded/2024/abhusbb/2023_05_13/dam-linh-3-7883.jpg",
    members: "+ 1520",
    gift_title: "TỔNG GIÁ TRỊ",
    status: 0
  },
  {
    id: 3,
    highlight: 1,
    dataType: 'TDU',
    menu: 'quiz',
    title: "item Learn: Tài chính cơ sở",
    description: "Thể hiện sự hiểu biết về các mô hình nến Nhật.",
    pic: "https://www.berlinsbi.com/uploads/sites/2/2021/12/7-very-good-reasons-to-do-master-s-in-finance.jpg",
    value: "50",
    timer: "Bắt đầu trong 3d",
    completed: true,
    avatar1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8x0ee4fgYxGx_IIofSYK8qCImoimqWKVjA&s",
    avatar2: "https://i.scdn.co/image/ab6761610000e5eb653268b19c265e835504190e",
    avatar3: "https://vcdn1-giaitri.vnecdn.net/2024/07/05/ca-si-phuong-linh-1720168809-1-5452-7217-1720169102.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=fWeWTaPCEXOjzAY194qrxA",
    avatar4: "https://image.anninhthudo.vn/1200x630/Uploaded/2024/abhusbb/2023_05_13/dam-linh-3-7883.jpg",
    members: "+ 12520",
    gift_title: "GIẢI THƯỞNG",
    status: 1
  },
  {
    id: 4,
    highlight: 1,
    menu: 'quiz',
    title: "Quiz Brand: Tìm hiểu về Windsor",
    description: "Khám phá những thông tin hữu ích từ sàn Windsor và nhận giải thưởng lớn",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9lPHjKu0cn6OlbSRiQzARwEzg9WVYU3VQw&s",
    value: "50",
    timer: "Bắt đầu trong 3d",
    completed: true,
    avatar1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8x0ee4fgYxGx_IIofSYK8qCImoimqWKVjA&s",
    avatar2: "https://i.scdn.co/image/ab6761610000e5eb653268b19c265e835504190e",
    avatar3: "https://vcdn1-giaitri.vnecdn.net/2024/07/05/ca-si-phuong-linh-1720168809-1-5452-7217-1720169102.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=fWeWTaPCEXOjzAY194qrxA",
    avatar4: "https://image.anninhthudo.vn/1200x630/Uploaded/2024/abhusbb/2023_05_13/dam-linh-3-7883.jpg",
    members: "+ 12520",
    gift_title: "GIẢI THƯỞNG",
    status: 0
  },
];
const newsData = [
  {
    id: 1,
    dataType: "Crypto",
    menu: 'news',
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
    menu: 'news',
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
    menu: 'news',
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
const announData = [
  "Chào mừng bạn đến với Đấu Trường!",
  "Đừng bỏ lỡ cơ hội nhận giải thưởng lớn!",
  "Khám phá ngay các item hấp dẫn!",
  "Tìm hiểu thêm về các chương trình ưu đãi!",
  "Heleng Nguyen đóng góp 1500 TBC cho Quỹ khuyến học TadaBee - 2 tiếng trước",
];

function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [announText, setAnnounText] = useState(announData[0]);
  const [currentAnnounIndex, setCurrentAnnounIndex] = useState(0);

  const navigate = useNavigate(); // Khai báo navigate

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnounIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % announData.length;
        setAnnounText(announData[nextIndex]);
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtereditemzes = quizData.filter((item) => item.highlight === activeTab);
  const filteredNews = newsData;

  // Hàm điều hướng đến trang chi tiết
  const navigateToDetail = (id, dataType, menu) => {
    if (menu === 'news') {
      navigate(`/news/${id}`);
    } else if (menu === 'tadatv') {
      navigate(`/tadatv/${id}`);
    } else if (menu === 'course') {
      navigate(`/course/${id}`);
    }
    else if (menu === 'quiz') {
    navigate(`/quiz/${id}?${dataType}`);
  }
  };

  return (
    <div className="home">
      <Header />
      <div className="rectangle-container">
        <div className="home-circle">
          <img src={avatar} alt="Gift Icon" />
        </div>
        <div className="rectangle">
          <div className="rectangle-text">
            {announText}
          </div>
        </div>
      </div>
      <main className="content-wrapper">
        <h2 className="title">Nổi bật</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            type: 'bullets',
          }}
        >
          {filtereditemzes.map((item) => (
            <SwiperSlide key={item.id} onClick={() => navigateToDetail(item.id, item.dataType, item.menu)}>
              <QuizCard
                title={item.title}
                description={item.description}
                pic={item.pic}
                value={item.value}
                timer={item.timer}
                avatar1={item.avatar1}
                avatar2={item.avatar2}
                avatar3={item.avatar3}
                avatar4={item.avatar4}
                members={item.members}
                completed={item.completed}
                gift_title={item.gift_title}
                status={item.status}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="dynamic-content">
          <h2 className="title">Tin tức mới</h2>
        </div>
        <div>
        {filteredNews.map(item => {
            if (item.menu === 'news') {
              return (
                <div key={item.id} onClick={() => navigateToDetail(item.id, item.dataType, item.menu)}>
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
            } else if (item.menu === 'tadatv') {
              return (
                <div key={item.id} onClick={() => navigateToDetail(item.id, item.dataType, item.menu)}>
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
            } else if (item.menu === 'course') {
              return (
                <div key={item.id} onClick={() => navigateToDetail(item.id, item.dataType, item.menu)}>
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

export default Home;
