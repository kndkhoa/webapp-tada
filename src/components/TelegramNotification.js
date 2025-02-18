// TelegramNotification.js
import React from 'react';

const token = '8032885107:AAEjNWGp7v2n7ZH78Oy6cCCWHGiCMIzB2xU'; // Bot An An là AI
const url = `https://api.telegram.org/bot${token}/sendMessage`;
const main_token = '7458768044:AAG-LvoaLQhn8VMgCY1ZCtnq099gMvfEnW4'; // Bot TadaUp Global
const main_url = `https://api.telegram.org/bot${main_token}/sendMessage`;

const adminId = '6461541179'; // ID của admin Telegram

// Hàm gửi tin nhắn đến Telegram
export const sendTelegramMessage = async (message) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: adminId,
        text: message, // Nội dung tin nhắn
      }),
    });

    if (!response.ok) {
      console.error('Failed to send message to admin');
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
};

// Hàm gửi tin nhắn đến Telegram
export const sendSignal = async (message, groupId) => {
  // Kiểm tra nếu groupId không tồn tại, sử dụng adminId
  const targetId = groupId || adminId;

  try {
    const response = await fetch(main_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: targetId,
        text: message, // Nội dung tin nhắn
      }),
    });

    if (!response.ok) {
      console.error('Failed to send message to admin');
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
};

// Hàm gửi Inline Keyboard
export const sendInlineKeyboard = async (text, buttonText, callbackData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: adminId,
        text: text,
        reply_markup: {
          inline_keyboard: [
            [{ text: buttonText, callback_data: callbackData }]
          ]
        }
      }),
    });

    if (response.ok) {
      console.log('Inline Keyboard sent successfully');
    } else {
      console.error('Failed to send Inline Keyboard');
    }
  } catch (error) {
    console.error('Error sending Inline Keyboard:', error);
  }
};

const TelegramNotification = ({ message, inlineText, buttonText, callbackData }) => {
  React.useEffect(() => {
    if (message) {
      sendTelegramMessage(message);
    }
    if (inlineText && buttonText && callbackData) {
      sendInlineKeyboard(inlineText, buttonText, callbackData);
    }
  }, [message, inlineText, buttonText, callbackData]);

  return null;
};

export default TelegramNotification;
