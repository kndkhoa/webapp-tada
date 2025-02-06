import React from "react";
import "./PortFolio.css";
import trading1Icon from "./assets/icons/trading-analysis-1.png";
import trading2Icon from "./assets/icons/trading-analysis-2.png";
import trading3Icon from "./assets/icons/trading-analysis-3.png";
import tradingIcon from "./assets/icons/trading.png";

const TradingAnalysis = ({ trading_accounts, accountMT5 }) => {
  // Tìm Trading Account có accountMT5 khớp
  const currentAccount = trading_accounts?.find(
    (account) => account.accountMT5 === accountMT5
  );

  // Nếu không tìm thấy Trading Account thì hiển thị thông báo
  if (!currentAccount) {
    return (
      <div className="incomechart-content-container">
        <p>Không tìm thấy Trading Account cho account {accountMT5}</p>
      </div>
    );
  }

  // Lấy incomeCharts từ Trading Account, nếu không có thì mặc định là mảng rỗng
  const lotData = currentAccount.incomeCharts || [];

  // Tính các biến:
  const totalTrades = lotData.length;
  const profitableTrades = lotData.filter(
    (item) => Number(item.income_amount) > 0
  ).length;
  const losingTrades = lotData.filter(
    (item) => Number(item.income_amount) < 0
  ).length;

  return (
    <div className="incomechart-content-container">
      {/* Header Section */}
      <div className="portfolio-header">
        <div className="portfolio-header-title">
          <img src={tradingIcon} alt="Balance Icon" className="portfolio-icon" />
          <span>Trading Analysis</span>
        </div>
        <hr className="portfolio-divider-fullwidth" />
        <div className="balance-body">
          <div className="balance-list">
            <div className="balance-left">
              <img src={trading1Icon} alt="Balance Icon" className="balance-icon" />
              <div className="balance-title">Total Trades</div>
            </div>
            <span className="balance-amount">{totalTrades}</span>
          </div>
          <div className="balance-list">
            <div className="balance-left">
              <img src={trading2Icon} alt="Balance Icon" className="balance-icon" />
              <div className="balance-title">Profitable Trades</div>
            </div>
            <span className="balance-amount">{profitableTrades}</span>
          </div>
          <div className="balance-list-end">
            <div className="balance-left">
              <img src={trading3Icon} alt="Balance Icon" className="balance-icon" />
              <div className="balance-title">Losing Trades</div>
            </div>
            <span className="balance-amount">{losingTrades}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingAnalysis;
