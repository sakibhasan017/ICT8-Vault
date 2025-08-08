import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarSection.css';

const CalendarSection = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/calendar/list`);
        const data = await res.json();

        if (data.success && Array.isArray(data.message)) {
          const formatted = data.message.map(item => ({
            title: item.title,
            date: item.date,
            color:
              item.section === 'A' ? '#3498db' :
              item.section === 'B' ? '#2ecc71' :
              '#f39c12'
          }));
          setEvents(formatted);
        } else {
          console.error("Invalid response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
      }
    };

    fetchCalendarData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(null);

    try {
      const res = await fetch('http://localhost:5000/api/notify/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, section }),
      });
      const data = await res.json();
      setMessage(data.message);
      setIsSuccess(data.success);

      if (data.success) {
        setName('');
        setEmail('');
        setSection('');
        setTimeout(() => {
          setShowPopup(false);
          setMessage('');
          setIsSuccess(null);
        }, 1000);
      }
    } catch (err) {
      setMessage('Failed to submit.');
      setIsSuccess(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setMessage('');
    setIsSuccess(null);
  };

  return (
    <section className="calendar-section" id="calendar">
      <div className="calendar-header">
        <h2>📅 Monthly Alerts</h2>
        <div className="notify-link">
          <p onClick={() => setShowPopup(true)}>Wanna Notify? <u>Click here</u></p>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Get Notified by Email</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                
              </select>

              <button type="submit">Submit</button>
              
              
              {message && (
                <p className={isSuccess ? 'message success' : 'message error'}>
                  {message}
                </p>
              )}

              <button type="button" onClick={closePopup}>Close</button>
            </form>
          </div>
        </div>
      )}

      <div className="legend">
        <span className="legend-item section-a">Section A</span>
        <span className="legend-item section-b">Section B</span>
        <span className="legend-item section-all">All Sections</span>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </div>
    </section>
  );
};

export default CalendarSection;
