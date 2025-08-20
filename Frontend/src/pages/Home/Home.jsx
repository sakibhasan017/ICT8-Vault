import React from "react";
import Hero from "../../components/Hero/Hero.jsx";
import NoticeSection from "../../components/NoticeSection/NoticeSection.jsx";
import ScheduleSection from "../../components/ScheduleSection/ScheduleSection.jsx";
import RoutineSection from "../../components/RoutineSection/RoutineSection.jsx";
import CalendarSection from "../../components/CalenderSection/CalendarSection.jsx";
import LatestCourses from "../../components/LatestCourses/LatestCourses.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <LatestCourses/>
      <NoticeSection />
      <ScheduleSection />
      <div style={{ marginTop: "60px" }}>
        <RoutineSection />
      </div>
      <CalendarSection />
    </>
  );
};

export default Home;
