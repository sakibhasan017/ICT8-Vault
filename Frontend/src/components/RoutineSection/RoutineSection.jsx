import React, { useState, useEffect } from 'react';
import './RoutineSection.css';

const routineData = {
  sectionA: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    times: ['8:30–10:00', '10:15–11:45', '12:00–1:30', '2:00–3:30', '3:45–5:15'],
    schedule: {
      Sunday: [
        { course: 'Networking', location: 'Lab-02' },
        { course: 'Cloud Computing Lab', location: 'CR-304' },
        null,
        null,
        null,
      ],
      Monday: [null, { course: 'OS', location: 'CR-102' }, { course: 'AI', location: 'CR-204' }, null, null],
      Tuesday: [null, null, null, null, null],
      Wednesday: [null, null, null, null, null],
      Thursday: [null, null, null, null, null],
    },
  },
  sectionB: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    times: ['8:30–10:00', '10:15–11:45', '12:00–1:30', '2:00–3:30', '3:45–5:15'],
    schedule: {
      Sunday: [{ course: 'Database Systems', location: 'CR-201' }, null, null, { course: 'AI Lab', location: 'Lab-01' }, null],
      Monday: [{ course: 'Networking', location: 'Lab-02' }, null, { course: 'OS', location: 'CR-304' }, null, null],
      Tuesday: [null, null, null, null, null],
      Wednesday: [null, null, null, null, null],
      Thursday: [null, null, null, null, null],
    },
  },
};

const RoutineTable = ({ routine }) => {
  return (
    <div className='responsive-table-wrapper'>
    <table className="routine-table">
      <thead>
        <tr>
          <th>Day / Time</th>
          {routine.times.map((time, idx) => (
            <th key={idx}>{time}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {routine.days.map((day) => (
          <tr key={day}>
            <td className="day-cell">{day}</td>
            {routine.schedule[day].map((slot, idx) => (
              <td key={idx} className={`slot ${slot ? 'filled' : 'empty'}`}>
                {slot ? (
                  <>
                    <div className="course-name">{slot.course}</div>
                    <div className="location">📍 {slot.location}</div>
                  </>
                ) : (
                  <span className="no-class">—</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

const RoutineSection = () => {
  const [currentSection, setCurrentSection] = useState('sectionA');
  const [fade, setFade] = useState(false);

  const handleSectionChange = (section) => {
    setFade(true); 
    setTimeout(() => {
      setCurrentSection(section);
      setFade(false); 
    }, 300); 
  };

  return (
    <section className="routine-section" id="routine">
      <center><h1>📘 Class Routine</h1></center><br />

      <div className="section-buttons">
        <button
          className={currentSection === 'sectionA' ? 'active' : ''}
          onClick={() => handleSectionChange('sectionA')}
        >
          Section A
        </button>
        <button
          className={currentSection === 'sectionB' ? 'active' : ''}
          onClick={() => handleSectionChange('sectionB')}
        >
          Section B
        </button>
      </div>

      <div className={`routine-wrapper ${fade ? 'fade-out' : ''}`}>
        <RoutineTable routine={routineData[currentSection]} />
      </div>
    </section>
  );
};

export default RoutineSection;
