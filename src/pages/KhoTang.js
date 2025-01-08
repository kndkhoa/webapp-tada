import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import Header from "../components/Header";
import News from "../components/News";
import Footer from "../components/Footer";
import "./KhoTang.css";

function KhoTang() {
  const [activeTab, setActiveTab] = useState('tintuc');
  const [activedataType, setActivedataType] = useState('All');
  const [dataType, setDataType] = useState('news');
  const [newsData, setNewsData] = useState([]);  // Dữ liệu từ API
  const [loading, setLoading] = useState(true);  // Biến để kiểm tra trạng thái loading

  const navigate = useNavigate();

  const handleNewsClick = (newsId, userId) => {
    if (dataType === 'news') {
      navigate(`/news/${newsId}`, { state: { userId } });  // Truyền id bài viết và id người dùng vào route
    } else if (dataType === 'tadatv') {
      navigate(`/tadatv/${newsId}`, { state: { userId } });
    } else if (dataType === 'course') {
      navigate(`/course/${newsId}`, { state: { userId } });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://admin.tducoin.com/api/news", {
          method: "GET",
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,  // Lấy API key từ môi trường
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNewsData(data);  // Lưu dữ liệu API vào state
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);  // Đánh dấu là đã hoàn thành việc fetch dữ liệu
      }
    };

    fetchData();
  }, []);  // Chỉ chạy một lần khi component mount

  const handleTabClick = (tab, type) => {
    setActiveTab(tab);
    setDataType(type);
    setActivedataType('All');
  };

  const handledataTypeClick = (dataType) => {
    setActivedataType(dataType);
  };

  const filteredData = (dataType === 'news' ? newsData : []).filter(item =>
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
        {dataType === 'news' && (
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
          {loading ? (
            <p>Loading...</p>  // Hiển thị khi đang tải dữ liệu
          ) : (
            filteredData.map(item => (
              <div key={item.id} onClick={() => handleNewsClick(item.id, 'userID')}>
                <News
                    title={item.title}
                    description={item.description}
                    banner={item.banner}
                    heartValue={item.heart}
                    commentvalue={item.comment}
                    coinactive={item.coinactive}
                    author={item.name}
                    created_at={item.created_at}
                    status={item.status}
                />
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default KhoTang;
