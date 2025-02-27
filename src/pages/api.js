export const preloadData = async (apiKey, userId, page = 1, limit = 10, doneAt = null, dataType = null) => {
  try {
    const signalData = await fetch(`https://admin.tducoin.com/api/signal?page=${page}&limit=${limit}${doneAt ? `&done_at=${doneAt}` : ''}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching signalData:", err); return {}; });

    const channelData = await fetch(`https://admin.tducoin.com/api/signal/channel?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching channelData:", err); return {}; });

    const quizData = await fetch(`https://admin.tducoin.com/api/quiz?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching quizData:", err); return {}; });

    const newsData = await fetch(
      `https://admin.tducoin.com/api/news?page=${page}&limit=${limit}${dataType ? `&dataType=${dataType}` : ''}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json()).catch(err => { console.error("Error fetching newsData:", err); return {}; });

    const userData = await fetch(`https://admin.tducoin.com/api/webappuser/${userId}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching userData:", err); return {}; });

    const courseData = await fetch(`https://admin.tducoin.com/api/course/${userId}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching courseData:", err); return {}; });

    const charityData = await fetch(`https://admin.tducoin.com/api/charity?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching charityData:", err); return {}; });

    const giftData = await fetch(`https://admin.tducoin.com/api/gift?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).catch(err => { console.error("Error fetching giftData:", err); return {}; });

    return {
      signalData: signalData?.data || [],
      signalHasMore: signalData?.meta?.hasMore || false,
      channelData: channelData?.data || [],
      channelHasMore: channelData?.meta?.hasMore || false,
      quizData: quizData?.data || [],
      quizHasMore: quizData?.meta?.hasMore || false,
      newsData: newsData?.data || [],
      newsHasMore: newsData?.meta?.hasMore || false,
      userData: userData?.data || {},
      courseData: courseData?.data || [],
      courseHasMore: courseData?.meta?.hasMore || false,
      charityData: charityData?.data || [],
      charityHasMore: charityData?.meta?.hasMore || false,
      giftData: giftData?.data || [],
      giftHasMore: giftData?.meta?.hasMore || false,
    };
  } catch (error) {
    console.error("Error during preloadData:", error);
    return {
      signalData: [],
      signalHasMore: false,
      channelData: [],
      channelHasMore: false,
      quizData: [],
      quizHasMore: false,
      newsData: [],
      newsHasMore: false,
      userData: {},
      courseData: [],
      courseHasMore: false,
      charityData: [],
      charityHasMore: false,
      giftData: [],
      giftHasMore: false,
    };
  }
};