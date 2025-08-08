import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Resources from "./pages/Resources/Resources.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import CoursePage from "./pages/CoursePage/CoursePage.jsx";
import GeneralResources from "./pages/GeneralResources/GeneralResources.jsx";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/resources/:courseId" element={<CoursePage/>}/>
        <Route path="/general-resources" element={<GeneralResources/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
