export const preloadData = async (apiKey, userId) => {
  try {
    // Thực hiện từng yêu cầu fetch riêng lẻ với .catch() để tránh toàn bộ Promise bị lỗi
    const signalData = await fetch("https://admin.tducoin.com/api/signal", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching signalData:", err); return {}; });

    const channelData = await fetch("https://admin.tducoin.com/api/signal/channel", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching channelData:", err); return {}; });

    const quizData = await fetch("https://admin.tducoin.com/api/quiz", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching quizData:", err); return {}; });

    const newsData = await fetch("https://admin.tducoin.com/api/news", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching newsData:", err); return {}; });

    const userData = await fetch(`https://admin.tducoin.com/api/webappuser/${userId}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching userData:", err); return {}; });

    const courseData = await fetch(`https://admin.tducoin.com/api/course/${userId}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching courseData:", err); return {}; });

    const charityData = await fetch("https://admin.tducoin.com/api/charity", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching charityData:", err); return {}; });

    const giftData = await fetch("https://admin.tducoin.com/api/gift", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching giftData:", err); return {}; });

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
