import React, { useState, useEffect } from 'react';
import TelegramNotification from './TelegramNotification';
import avatar from './assets/avatar.gif'; // Đường dẫn đến ảnh avatar
import qrcode from './assets/QR-Code.jpg'; // Đường dẫn đến ảnh QR code
import './Report.css'; // Import CSS riêng
import './BuyAC.css'; // Import CSS của BuyAC

const BuyAC = ({ userID, walletAC, onClose, userWallet }) => {
  const [acAmount, setAcAmount] = useState(0); // Lưu số lượng AC muốn mua
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [showQRCode, setShowQRCode] = useState(false); // Hiển thị QR code sau khi confirm
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút = 600 giây
  const [transactionConfirmed, setTransactionConfirmed] = useState(false); // Trạng thái giao dịch đã xác nhận
  
  const walletAddress= "TV7qBtuDZfhq7N8ctqJrXkXBtMtb6CMz46"; // Địa chỉ ví TadaUp

  const handleChangeAmount = (event) => {
    setAcAmount(event.target.value); // Cập nhật số lượng AC khi nhập
  };

  const handleRegister = () => {
    if (acAmount <= 0) {
      setError('Please enter a valid amount of AC.');
      return;
    }

    setError(null); // Reset lỗi nếu có
    setShowQRCode(true); // Hiển thị QR code và bắt đầu bộ đếm ngược

    // Bắt đầu kiểm tra giao dịch
    checkTransaction();
  };

  // Tính số tiền USDT cần trả (1 USDT = 10 AC)
  const usdtAmount = acAmount / 10;

  // Cài đặt bộ đếm thời gian ngược
  useEffect(() => {
    if (showQRCode && timeLeft > 0 && !transactionConfirmed) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Cập nhật mỗi giây

      // Dọn dẹp bộ đếm thời gian khi component unmount hoặc khi thời gian kết thúc
      return () => clearInterval(timer);
    }
  }, [showQRCode, timeLeft, transactionConfirmed]);

  // Hàm chuyển đổi thời gian còn lại thành định dạng phút:giây
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const checkTransaction = () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`https://api.tronscan.org/api/transactions?address=${walletAddress}`);
        const data = await response.json();
        const transactions = data.data;

        // Kiểm tra các giao dịch gửi USDT
        const transaction = transactions.find((tx) => tx.to_address === walletAddress && tx.from_address === userWallet);
        if (transaction) {
          setTransactionConfirmed(true); // Giao dịch thành công
          
          // Sử dụng số lượng USDT đã nhận được từ giao dịch
          const usdtAmount = transaction.amount; // Số lượng USDT nhận được
          updateUserBalance(userID, usdtAmount); // Cập nhật AC cho người dùng
          clearInterval(interval); // Dừng việc kiểm tra sau khi nhận được giao dịch
        }
      } catch (error) {
        console.error('Lỗi khi lấy giao dịch:', error);
      }

      if (timeLeft <= 0) {
        clearInterval(interval); // Dừng khi hết thời gian
        setError('Hết thời gian. Vui lòng thử lại.');
      }
    }, 5000); // Kiểm tra mỗi 5 giây
  };

const updateUserBalance = async (userID, usdtAmount) => {
    const acAmount = usdtAmount / 10; // Tỷ lệ quy đổi 1 USDT = 10 AC

    // Gửi yêu cầu POST cập nhật AC cho user
    try {
        const response = await fetch("https://admin.tducoin.com/api/webappuser/addac", {
            method: "POST",
            headers: {
                "x-api-key": "oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: userID,
                amount: acAmount, // Số lượng AC cần cộng vào tài khoản
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Cập nhật wallet_AC trong sessionStorage
            const updatedUserData = JSON.parse(sessionStorage.getItem("userData"));
            updatedUserData.wallet_AC += acAmount; // Cộng thêm số AC vào tài khoản người dùng
            sessionStorage.setItem("userData", JSON.stringify(updatedUserData));

        } else {
            alert('Failed to update AC.');
        }
    } catch (error) {
        console.error("Error updating user balance:", error);
    }
};



  return (
    <>
      <div className="overlay"></div>
      <div className="report-container">
        <div className="report-card">
          <button className="close-button" onClick={onClose}>X</button>
          <img src={avatar} alt="Avatar" className="report-avatar" />

          {/* Nếu chưa nhấn Confirm, hiển thị các thông tin */}
          {!showQRCode && (
            <div className="buyac-details">
              <p><b>User ID:</b> {userID}</p>
              <p><b>Wallet AC:</b> {walletAC} AC</p>
              <input
                type="number"
                placeholder="Enter the quantity of AC you need..."
                value={acAmount}
                onChange={handleChangeAmount}
              />

              {/* Ghi chú về số tiền USDT cần trả */}
              <p className="note">
                USDT you need to pay: <b>{usdtAmount} USDT</b>
              </p>

              {/* Hiển thị lỗi nếu có */}
              {error && <p className="error-message">{error}</p>}

              {/* Nút động thay đổi dựa trên điều kiện */}
              <button onClick={handleRegister} disabled={acAmount <= 0}>
                Confirm
              </button>
            </div>
          )}

          {/* Nếu đã nhấn Confirm, hiển thị QR code và bộ đếm thời gian */}
          {showQRCode && (
            <div className="qr-container">
              <img src={qrcode} alt="QR Code" className="qr-code" />
              <p><i>Please transfer USDT to the wallet address provided above!</i></p>
              <p>Time Left: <b>{formatTime(timeLeft)}</b></p>
              {timeLeft === 0 && <p>Time Expired. Please try again.</p>} {/* Hiển thị khi hết thời gian */}            
              
              <TelegramNotification message={`Có user ID là ${userID} đăng ký mua ${acAmount} AC, tương đương ${usdtAmount}. Hãy theo dõi tài khoản hệ thống có nhận được tiền chưa nha sếp?!`} />
            
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyAC;
