import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import Header from "../components/Header";
import Charity from "../components/Charity";
import Gift from "../components/Gift";
import Footer from "../components/Footer";
import "./QuaThuong.css";

// Dữ liệu charity với dataType
const charityData = [
  { id: 1, 
    dataType: 'tuthien', 
    title: 'Học bổng khuyến học trẻ em vùng cao', 
    description: 'Trẻ em vùng cao sẽ có thêm điều kiện đến trường từ mỗi lượt thử thách đấu trường của bạn.',
    pic: 'https://mytourcdn.com/upload_images/Image/Minh%20Hoang/Tay%20bac/tre%20em/1.jpg',
    value: 10000,
    completion: 8656,
    members: 4635,
    gift_title: 'MỤC TIÊU QUYÊN GÓP',
    avatar1: 'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/10/1/ca-si-thuy-tien8-1696134384983166107603-205-0-1455-2000-crop-16961355019131767382141.jpg',
    avatar2: 'https://t.ex-cdn.com/vietnamfinance.vn/960w/files/f1/news/hoaithuong/2022/2/23/vnf-linh-vlogs-1.jpeg',
    avatar3: 'https://thanhnien.mediacdn.vn/Uploaded/thynhm/2022_08_30/thuy-tien-3558.jpg',
    avatar4: 'https://vnn-imgs-f.vgcloud.vn/2021/01/21/08/thieu-bao-tram-la-ai-10.jpg'
  },
  { id: 2,
    dataType: 'doithuong', 
    title: 'Voucher mua hàng tại TGDĐ', 
    description: 'Tưng bừng mua sắp với voucher trị giá 2 triệu đồng từ TheGioiDiDong.com dành riêng cho thành viên TadaUp. Nhận ngay hôm nay!!!',
    pic: 'https://cdn.tgdd.vn/Files/2020/12/22/1315495/thegioididongdienmayxanh_800x450.jpg',
    gift_title: 'ĐỔI VỚI',
    value: 10000,
    amount: 346, 
    backgroundColor: '#21AC35',
  },
  { id: 3,
    dataType: 'doithuong', 
    title: 'Nhận ngay 50 USDT khi mở tài khoản mới', 
    description: 'Đăng ký tài khoản Binance qua App TadaUp để nhận ngay 50 USDT vào tài khoản giao dịch Future, số lượng có hạn, hãy nhanh tay đổi điểm ngay hôm nay',
    pic: 'https://public.bnbstatic.com/image/cms/blog/20230714/844081d6-af32-4b9f-a55c-878684385b3f',
    gift_title: 'ĐỔI VỚI',
    value: 5000,
    amount: 53, 
  },
  { id: 4,
    dataType: 'doithuong', 
    title: 'Voucher di chuyển toàn quốc', 
    description: 'Đăng ký tài khoản Binance qua App TadaUp để nhận ngay 50 USDT vào tài khoản giao dịch Future, số lượng có hạn, hãy nhanh tay đổi điểm ngay hôm nay',
    pic: 'https://thinkzone.vn/uploads/2021_12/anthony-tan-1638776928.jpg',
    gift_title: 'ĐỔI VỚI',
    value: 1000,
    amount: 104,
    backgroundColor: '#FF7E1A',
  },
];

function QuaThuong() {
  const [activeTab, setActiveTab] = useState("doithuong"); // Tab mặc định
  const navigate = useNavigate(); // Hook để điều hướng

  // Hàm xử lý khi người dùng nhấn vào một tab
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật tab được chọn
  };

  // Lọc dữ liệu dựa trên tab đang chọn
  const filteredcharityzes = charityData.filter((item) => item.dataType === activeTab);

  // Hàm điều hướng đến chi tiết
  const handleNavigate = (id, dataType) => {
    navigate(`/QuaThuongDetail/${id}?dataType=${dataType}`);
  };

  return (
    <div className="App">
      <Header />
      <main>
        {/* Nút chuyển đổi tab */}
        <div className="tab-menu">
          <button
            className={`btn_doithuong ${activeTab === "doithuong" ? "active" : ""}`}
            onClick={() => handleTabClick("doithuong")}
          >
            Đổi thưởng
          </button>
          <button
            className={`btn_tuthien ${activeTab === "tuthien" ? "active" : ""}`}
            onClick={() => handleTabClick("tuthien")}
          >
            Quyên góp
          </button>
        </div>

        {/* Hiển thị charity dựa trên tab đang chọn */}
        {filteredcharityzes.map((item) => {
          if (item.dataType === 'tuthien') {
            return (
              <div key={item.id} onClick={() => handleNavigate(item.id, item.dataType)}>
                <Charity
                  title={item.title}
                  description={item.description}
                  pic={item.pic}
                  value={item.value}
                  avatar1={item.avatar1}
                  avatar2={item.avatar2}
                  avatar3={item.avatar3}
                  avatar4={item.avatar4}
                  members={item.members}
                  completion={item.completion}
                  gift_title={item.gift_title}
                />
              </div>
            );
          } else if (item.dataType === 'doithuong') {
            return (
              <div key={item.id} onClick={() => handleNavigate(item.id, item.dataType)}>
                <Gift
                  title={item.title}
                  description={item.description}
                  pic={item.pic}
                  value={item.value}
                  gift_title={item.gift_title}
                  amount={item.amount}
                  backgroundColor={item.backgroundColor}
                />
              </div>
            );
          } else {
            return null;
          }
        })}

      </main>
      <Footer />
    </div>
  );
}

export default QuaThuong;
