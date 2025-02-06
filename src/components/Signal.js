import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import hook navigate
import "./Signal.css";

const Signal = ({ author, avatar, margin, SL, E1, TP1, TP2, TP3, command, created_at, done_at }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const navigate = useNavigate(); // Khởi tạo navigate

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setDropdownHeight(0);
    } else if (dropdownRef.current) {
      const scrollHeight = dropdownRef.current.scrollHeight;
      setDropdownHeight(scrollHeight);
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Cập nhật height nếu nội dung dropdown thay đổi
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [isDropdownOpen]);

  // Hàm xử lý khi nhấn nút Chart
  const handleChartClick = () => {
    // Điều hướng sang trang Chart và truyền dữ liệu cần thiết thông qua state
    navigate("/chart", {
      state: { 
        author, 
        avatar, 
        margin, 
        SL, 
        E1, 
        TP1, 
        TP2, 
        TP3, 
        command, 
        created_at, 
        done_at 
      }
    });
  };

  return (
    <div className="signal-container">
      {/* Header */}
      <div className="signal-header">
        <div className="header-left">
          <div
            className="signal-avatar"
            style={{
              backgroundImage: avatar ? `url(${avatar})` : "none",
            }}
          ></div>
          <div className="header-text">
            <div className="author">{author}</div>
            <div className="margin">{margin}</div>
          </div>
        </div>
        <button className="header-button">{command}</button>
      </div>

      {/* Body */}
      <div className="signal-body">
        <div className="signal-body-item">
          <span className="icon">📉</span>
          <span className="text">Stop Loss</span>
          <span>{SL}</span>
        </div>
        <div className="signal-body-item">
          <span className="icon">📈</span>
          <span className="text">Entry</span>
          <span>{E1}</span>
        </div>
        <div className="signal-body-item">
          <div className="dropdown">
            <div
              className="dropdown-header"
              onClick={toggleDropdown}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span className="text" style={{ flex: 1, textAlign: "left" }}>Targets</span>
              <span className="dropdown-arrow" style={{ textAlign: "right", flex: 0 }}>
                {isDropdownOpen ? "🡵" : "🡶"}
              </span>
            </div>
            <div
              ref={dropdownRef}
              className="dropdown-menu"
              style={{
                height: `${dropdownHeight}px`,
                overflow: "hidden",
                transition: "height 0.3s ease-in-out",
              }}
            >
              <div className="dropdown-item">
                <span>Take Profit 1</span>
                <span>{TP1}</span>
              </div>
              <div className="dropdown-item">
                <span>Take Profit 2</span>
                <span>{TP2}</span>
              </div>
              <div className="dropdown-item">
                <span>Take Profit 3</span>
                <span>{TP3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="signal-footer">
        <div className="signal-text-footer">
          <div><b>Opened:</b> {created_at}</div>
        </div>
        <div className="signal-text-footer">
          {done_at !== null && <div><b>Closed:</b> {done_at}</div>}
        </div>
         {/*
        <div className="button-container">
         <button className="signalfooter-button" onClick={handleChartClick}>Chart</button>
        </div>*/}
      </div>
    </div>
  );
};

export default Signal;
