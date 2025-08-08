import React from 'react';
import './GeneralResources.css';


import RoutineIcon from '../../assets/calender-icon.png';
import CalendarIcon from '../../assets/academic-icon.png';
import BusIcon from '../../assets/bus-icon.png';
import AssignmentIcon from '../../assets/assignment-icon.png';
import GroupIcon from '../../assets/group-icon.png';
import ReportIcon from '../../assets/report-icon.png';

const resources = [
  {
    title: "ICT Routine 7th Semester",
    url: "https://drive.google.com/file/d/1-MHMUulWlfeOXtmbClymqIflHfBMX-ir/view",
    icon: RoutineIcon,
  },
  {
    title: "Academic Calendar",
    url: "https://drive.google.com/file/d/1f2mMhx4Ko8nCLEKk9GyNVOOLaAqL5qs_/view",
    icon: CalendarIcon,
  },
  {
    title: "Bus Route for Student",
    url: "https://drive.google.com/file/d/1wWYjDnQbdcdGn8mPJz9JUB9yowsg2ODH/view",
    icon: BusIcon,
  },
  {
    title: "Cover Page for Assignment",
    url: "https://drive.google.com/file/d/15Fm0armFFmZ5Q-M_uwaksTIjtMd-R4sE/view",
    icon: AssignmentIcon,
  },
  {
    title: "Cover Page for Groups",
    url: "https://drive.google.com/file/d/1NxKb2sV5CjZsV166T1Lgf96DpSCWi1E6/view",
    icon: GroupIcon,
  },
  {
    title: "Cover Page for EEE Report",
    url: "https://drive.google.com/file/d/1ov2G5U1RTLYUIO6styfT2a54hKWcajHy/view",
    icon: ReportIcon,
  },
];

const GeneralResources = () => {
  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>📚 General Resources</h1>
        <p>Essential documents for students</p>
      </div>

      <div className="resources-grid">
        {resources.map((resource, index) => (
          <a 
            href={resource.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="resource-card"
            key={index}
          >
            <div className="resource-icon">
              <img src={resource.icon} alt={resource.title} />
            </div>
            <h3>{resource.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GeneralResources;