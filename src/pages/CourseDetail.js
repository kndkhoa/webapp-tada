import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';
import sharingIcon from '../components/assets/icons/sharing.png';
import backIcon from '../components/assets/icons/back.png';
import socialIcon from '../components/assets/icons/social.png';
import { ReloadSkeleton, PreloadImage } from "../components/waiting"; // Import ReloadSkeleton và PreloadImage

function CourseDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('tientrinh');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(() => {
    const cachedUserData = sessionStorage.getItem('userData');
    console.log('Cached user data:', cachedUserData);
    return cachedUserData ? JSON.parse(cachedUserData) : null;
  });

  const apiKey = 'oqKbBxKcEn9l4IXE4EqS2sgNzXPFvE';

  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onload = () => {
        console.log('YouTube API loaded');
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!userData) return;

      try {
        const response = await fetch(`http://admin.tducoin.com/api/course/${id}/${userData.userID}`, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu khóa học.');
        }

        const data = await response.json();
        if (data && data.data) {
          setCourse(data.data);
        } else {
          setError('Không tìm thấy khóa học.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id, userData]);

  if (loading) {
    return <ReloadSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!course) {
    return <div>Không tìm thấy khóa học</div>;
  }

  const BASE_URL = 'http://admin.tducoin.com/public/storage/';
  const picUrl = `${BASE_URL}${course.banner}`;
  const mentorUrl = `${BASE_URL}${course.mentor_avatar}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(course.title)}`;

  return (
    <div className="news-detail-container">
      <div className="banner-header">
        <button className="backIcon" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Back Icon" className="backIconImage" />
        </button>
        <PreloadImage src={picUrl} alt="Banner" />
        <h2 className="banner-title">{course.title}</h2>
        <div className="banner-info">
          <PreloadImage src={mentorUrl} alt="Mentor Avatar" />
          <span className="banner-info-text">{course.mentor}</span>
        </div>
      </div>
      <div className="news-detail-content">
        <div className="tab-menu-course">
          <div className="tab-menu">
            <button
              className={`btn_tientrinh ${activeTab === 'tientrinh' ? 'active' : ''}`}
              onClick={() => setActiveTab('tientrinh')}
            >
              Tiến trình
            </button>
            <button
              className={`btn_thaoluan ${activeTab === 'thaoluan' ? 'active' : ''}`}
              onClick={() => setActiveTab('thaoluan')}
            >
              Thảo luận
            </button>
          </div>
        </div>
        {activeTab === 'tientrinh' && (
          <div className="course-progress-container">
            {course.lessons &&
              course.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="course-step"
                  onClick={() => handleVideoPlay(lesson)}
                >
                  <div className="course-circle-container">
                    <svg className="course-circle" viewBox="0 0 36 36" width="80" height="80">
                      <path
                        className="course-circle-background"
                        d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="3"
                      />
                      <path
                        className="course-circle-progress"
                        d="M18 2.0845a15.9155 15.9155  0 1 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                        strokeDashoffset={100 - lesson.progress}
                      />
                    </svg>
                    <div className="course-circle-text">
                      <div className="course-percentage">{lesson.progress}%</div>
                    </div>
                  </div>
                  <div className="course-text-container">
                    <div className="course-title">{lesson.lesson_name}</div>
                    <div className="course-description">{lesson.lesson_description}</div>
                    <div className="course-time">{lesson.lesson_duration} phút</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
