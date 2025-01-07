import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Đảm bảo đã nhập useNavigate
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import Footer from "../components/Footer";
import "./DauTruong.css";

// Dữ liệu Quiz với dataType
const quizData = [
  {
    id: 1,
    dataType: "USDT",
    title: "Quiz Lott: Tư duy tài chính",
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
    dataType: "USDT",
    title: "Quiz 1vs1: Độ hiểu biết nến Nhật",
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
    id: 1,
    dataType: "TDU",
    title: "Quiz Learn: Tài chính cơ sở",
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
    id: 2,
    dataType: "TDU",
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

function DauTruong() {
  const [activeTab, setActiveTab] = useState("TDU"); // Tab mặc định
  const navigate = useNavigate(); // Khai báo navigate
  const handleNewsClick = (id, dataType) => {
    navigate(`/quiz/${id}?dataType=${dataType}`);  // Điều hướng đến quiz/:id và truyền dataType qua query string
  };


  // Hàm xử lý khi người dùng nhấn vào một tab
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật tab được chọn
  };

  // Lọc dữ liệu dựa trên tab đang chọn
  const filteredQuizzes = quizData.filter((quiz) => quiz.dataType === activeTab);

  return (
    <div className="App">
      <Header />
      <main>
        {/* Nút chuyển đổi tab */}
        <div className="tab-menu">
          <button
            className={`btn_dautdu ${activeTab === "TDU" ? "active" : ""}`}
            onClick={() => handleTabClick("TDU")}
          >
            Đấu TDU
          </button>
          <button
            className={`btn_dauusdt ${activeTab === "USDT" ? "active" : ""}`}
            onClick={() => handleTabClick("USDT")}
          >
            Đấu USDT
          </button>
        </div>

        {/* Hiển thị Quiz dựa trên tab đang chọn */}
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => handleNewsClick(quiz.id, quiz.dataType)} // Truyền dataType vào đây
          >
          <QuizCard
            title={quiz.title}
            description={quiz.description}
            pic={quiz.pic}
            value={quiz.value}
            timer={quiz.timer}
            avatar1={quiz.avatar1}
            avatar2={quiz.avatar2}
            avatar3={quiz.avatar3}
            avatar4={quiz.avatar4}
            members={quiz.members}
            completed={quiz.completed}
            gift_title={quiz.gift_title}
            status={quiz.status}
          />
        </div>
      ))}
      </main>
      <Footer />
    </div>
  );
}

export default DauTruong;
