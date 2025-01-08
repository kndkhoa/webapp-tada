import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import Header from "../components/Header";
import News from "../components/News";
import Footer from "../components/Footer";
import "./KhoTang.css";

function KhoTang() {
  const [activeTab, setActiveTab] = useState('tintuc');
  const [activedataType, setActivedataType] = useState('All');
  const [activeCatalogue, setActiveCatalogue] = useState('All');
  const [dataType, setDataType] = useState('news');
  const [newsData, setNewsData] = useState([]); // Dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const navigate = useNavigate();

  const handleNewsClick = (newsId, userId) => {
    if (dataType === 'news') {
      navigate(`/news/${newsId}`, { state: { userId } }); // Chuyển hướng đến route Tin tức
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
            "x-api-key": process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNewsData(data); // Lưu dữ liệu API vào state
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchData();
  }, []); // Chạy khi component mount

  const handleTabClick = (tab, type) => {
    setActiveTab(tab);
    setDataType(type);
    setActivedataType('All');
    setActiveCatalogue('All');
  };

  const handledataTypeClick = (dataType) => {
    setActivedataType(dataType);
  };

  const handleCatalogueClick = (catalogue) => {
    setActiveCatalogue(catalogue);
  };

  const filteredData = newsData.filter(item => 
    (activedataType === 'All' || item.dataType === activedataType) &&
    (activeCatalogue === 'All' || item.catalogue === activeCatalogue)
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
            Khóa học
          </button>
        </div>

        {dataType === 'news' && (
          <div className="filters-container">
            <div className="dataType-filter">
              <div 
                className={`filter-item ${activedataType === 'All' ? 'active' : ''}`} 
                onClick={() => handledataTypeClick('All')}
              >
                All
              </div>
              <div 
                className={`filter-item ${activedataType === 'Crypto' ? 'active' : ''}`} 
                onClick={() => handledataTypeClick('Crypto')}
              >
                Crypto
              </div>
              <div 
                className={`filter-item ${activedataType === 'Forex' ? 'active' : ''}`} 
                onClick={() => handledataTypeClick('Forex')}
              >
                Forex
              </div>
              <div 
                className={`filter-item ${activedataType === 'Goods' ? 'active' : ''}`} 
                onClick={() => handledataTypeClick('Goods')}
              >
                Goods
              </div>
              <div 
                className={`filter-item ${activedataType === 'CFD' ? 'active' : ''}`} 
                onClick={() => handledataTypeClick('CFD')}
              >
                CFD
              </div>
            </div>
            <div className="catalogue-filter">
              <div 
                className={`filter-item ${activeCatalogue === 'All' ? 'active' : ''}`} 
                onClick={() => handleCatalogueClick('All')}
              >
                All
              </div>
              <div 
                className={`filter-item ${activeCatalogue === 'Crypto' ? 'active' : ''}`} 
                onClick={() => handleCatalogueClick('Crypto')}
              >
                Crypto
              </div>
              <div 
                className={`filter-item ${activeCatalogue === 'Forex' ? 'active' : ''}`} 
                onClick={() => handleCatalogueClick('Forex')}
              >
                Forex
              </div>
            </div>
          </div>
        )}

        <div className="content-container">
          {loading ? (
            <p>Loading...</p> // Hiển thị khi đang tải
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
