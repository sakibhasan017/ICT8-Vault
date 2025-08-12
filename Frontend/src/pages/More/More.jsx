import React from "react";
import { useNavigate } from "react-router-dom";
import "./More.css";

const More = () => {
  const navigate = useNavigate();

  const openDriveLink = () => {
    window.open("https://drive.google.com/your-link-here", "_blank");
  };

  return (
    <div className="more-container">
      <h1 className="more-title">Explore More</h1>
      <div className="more-grid">

        <div className="more-card" onClick={() => navigate("/week-updates")}>
          <h2>🗞️ Weekly Updates</h2>
          <p>Stay updated with the latest news about semester.</p>
        </div>

        <div className="more-card" onClick={() => navigate("/performance-tracker")}>
          <h2>📊 Performance Tracker</h2>
          <p>Track your marks, attendance, and progress in style.</p>
        </div>

        <div className="more-card" onClick={() => window.open("https://drive.google.com/file/d/1zid6CdGhZtoTO_cuFZUGygc3_nBFdfrB/view?usp=sharing", "_blank")}>
          <h2>📘 Academic Guidelines</h2>
          <p>Access official guidelines and study resources.</p>
        </div>

        <div className="more-card" onClick={() => navigate("/memories")}>
          <h2>📷 Memories</h2>
          <p>Relive best moments and campus life.</p>
        </div>

        <div className="more-card" onClick={() => navigate("/achievements")}>
          <h2>🏆 Achievements</h2>
          <p>Celebrate milestones and successes.</p>
        </div>

        <div className="more-card" onClick={() => navigate("/feedback")}>
          <h2>💬 Share Your Thoughts</h2>
          <p>Share your ideas, suggestions, or concerns to help us improve.</p>
        </div>


      </div>
    </div>
  );
};

export default More;
