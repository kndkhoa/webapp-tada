import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";
import "./SignalChart.css"; // Cập nhật CSS phù hợp

function SignalChart() {
  const location = useLocation();
  const { SL, TP1, TP2, TP3, E1, E2, E3, created_at, done_at } = location.state || {};

  const [candlestickData, setCandlestickData] = useState([]);
  const interval = "1h";

  // Lấy dữ liệu nến từ Binance
  useEffect(() => {
    const fetchCandlestickData = async () => {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=168`
        );

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu nến từ API.");
        }

        const data = await response.json();
        const formattedData = data.map((d) => ({
          x: new Date(d[0]),
          y: [parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), parseFloat(d[4])],
        }));

        setCandlestickData(formattedData);
      } catch (err) {
        console.error("Error fetching candlestick data:", err);
      }
    };

    fetchCandlestickData();
  }, [interval]);

  // Cấu hình biểu đồ ApexCharts
  const chartOptions = {
    chart: {
      type: "candlestick",
      height: "100%", // Chiều cao tự động
      background: "#ffffff",
      toolbar: { show: true },
    },
    title: {
      text: "BTC/USDT",
      align: "left",
      style: { color: "#000000" },
    },
    xaxis: {
      type: "datetime",
      min: new Date(created_at).getTime(),
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#000000" }, formatter: (value) => value.toFixed(2) },
    },
    annotations: {
      yaxis: [
        { y: SL, borderColor: "red", label: { text: `SL: ${SL}`, style: { color: "#fff", background: "red" } } },
        { y: TP1, borderColor: "green", label: { text: `TP1: ${TP1}`, style: { color: "#fff", background: "green" } } },
        { y: TP2, borderColor: "green", label: { text: `TP2: ${TP2}`, style: { color: "#fff", background: "green" } } },
        { y: TP3, borderColor: "green", label: { text: `TP3: ${TP3}`, style: { color: "#fff", background: "green" } } },
        { y: E1, borderColor: "blue", label: { text: `E1: ${E1}`, style: { color: "#fff", background: "blue" } } },
        { y: E2, borderColor: "blue", label: { text: `E2: ${E2}`, style: { color: "#fff", background: "blue" } } },
        { y: E3, borderColor: "blue", label: { text: `E3: ${E3}`, style: { color: "#fff", background: "blue" } } },
      ],
    },
  };

  const chartSeries = [{ data: candlestickData }];

  return (
    <div className="signal-chart-container">
      <Chart options={chartOptions} series={chartSeries} type="candlestick" height="100%" />
    </div>
  );
}

export default SignalChart;
