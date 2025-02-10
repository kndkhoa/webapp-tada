export const preloadData = async (apiKey, userId) => {
  try {
    const [signalData, channelData, quizData, newsData, userData, courseData, charityData, giftData] = await Promise.all([
      fetch("https://admin.tducoin.com/api/signal", { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch("https://admin.tducoin.com/api/signal/channel", { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch("https://admin.tducoin.com/api/quiz", { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch("https://admin.tducoin.com/api/news", { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch(`https://admin.tducoin.com/api/webappuser/${userId}`, { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch(`https://admin.tducoin.com/api/course/${userId}`, { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch("https://admin.tducoin.com/api/charity", { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),

      fetch("https://admin.tducoin.com/api/gift", { // Đổi từ http sang https
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    ]);

    return {
      signalData: signalData?.data || [],
      channelData: channelData?.data || [],
      quizData: quizData?.data || [],
      newsData: newsData?.data || [],
      userData: userData?.data || {},
      courseData: courseData?.data || [],
      charityData: charityData?.data || [],
      giftData: giftData?.data || [],
    };
  } catch (error) {
    console.error("Error during preloadData:", error);
    return {
      signalData: [],
      channelData: [],
      quizData: [],
      newsData: [],
      userData: {},
      courseData: [],
      charityData: [],
      giftData: [],
    };
  }
};
