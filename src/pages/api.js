export const preloadData = async (apiKey, userId) => {
    try {
      const [signalData, channelData, quizData, newsData, userData, courseData, charityData, giftData] = await Promise.all([
        fetch("http://admin.tducoin.com/api/signal", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),

        fetch("http://admin.tducoin.com/api/signal/channel", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
        
        fetch("http://admin.tducoin.com/api/quiz", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
  
        fetch("http://admin.tducoin.com/api/news", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
  
        fetch(`http://admin.tducoin.com/api/webappuser/${userId}`, {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
  
        fetch(`http://admin.tducoin.com/api/course/${userId}`, {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
  
        fetch("http://admin.tducoin.com/api/charity", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
  
        fetch("http://admin.tducoin.com/api/gift", {
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
  