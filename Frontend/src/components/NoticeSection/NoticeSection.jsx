import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './NoticeSection.css';

const NoticeSection = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notice/list`);
        const data = await res.json();

        if (data.success) {
          setNotices(data.message); 
        } else {
          console.error('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const createSanitizedHTML = (html) => ({
    __html: DOMPurify.sanitize(html)
  });

  return (
    <section id="notices" className="notice-section">
      <h2>📢 Important Notices</h2>
      <ul>
        {notices.map(notice => (
          <li key={notice._id} className={`notice-card notice-sec-${notice.section.toLowerCase()}`}>
            <h4>{notice.title}</h4>
            {notice.extraInfo && <p>{notice.extraInfo}</p>}
            {notice.date && <p>Date: {notice.date}</p>}
            <span className="section-badge">Section {notice.section}</span>
            {notice.additional && (
              <p 
                className="additional-info"
                dangerouslySetInnerHTML={createSanitizedHTML(`📝 ${notice.additional}`)}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NoticeSection;