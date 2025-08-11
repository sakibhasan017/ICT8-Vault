import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Notice from "./pages/Notice/Notice";
import Exam from "./pages/Exam/Exam";
import Calendar from "./pages/Calendar/Calendar";
import Assignment from "./pages/Assignment/Assignment";
import Feedback from "./pages/Feedback/Feedback";
import Notify from "./pages/Notify/Notify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/exam" element={<Exam/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/assignment" element={<Assignment/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/notify" element={<Notify/>}/>
      </Routes>
    </Router>
  );
}

export default App;
