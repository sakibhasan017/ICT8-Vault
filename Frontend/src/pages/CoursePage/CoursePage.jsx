import React from "react";
import { useParams } from "react-router-dom";
import courses from "../../data/courses.js";
import "./CoursePage.css";

const { teachers, courseData } = courses;

const CoursePage = () => {
  const { courseId } = useParams();
  const allCourses = Object.values(courseData).flat();
  const course = allCourses.find((c) => c.code === courseId);

  if (!course) return <div className="course-not-found">Course not found.</div>;

  const courseTeachers = course.teacherId
    ? teachers.filter((t) => course.teacherId.includes(t.id))
    : [];

  return (
    <div className={`course-container ${!course.folderId ? "no-folder" : ""}`}>
      <div className="course-header">
        <h2 className="course-title">{course.name}</h2>
        <div className="course-meta">
          {course.code && <span className="course-code">{course.code}</span>}
        </div>
      </div>

      {courseTeachers.length > 0 && (
        <div className="teacher-section">
          <h3 className="teacher-section-title">Course Instructor{courseTeachers.length > 1 ? "s" : ""}</h3>
          <div className="teacher-grid">
            {courseTeachers.map((teacher) => (
              <div className="teacher-card" key={teacher.id}>
                <h4 className="teacher-name">{teacher.name}</h4>
                {teacher.designation && <p className="teacher-designation">{teacher.designation}</p>}
                <p className="teacher-department">{teacher.department} - {teacher.university}</p>
                {teacher.phone && <p className="teacher-contact">📞 {teacher.phone}</p>}
                {teacher.email && <p className="teacher-contact">✉️ <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!course.folderId ? (
        <p className="no-folder-message">No Google Drive folder is available for this course yet.</p>
      ) : (
        <div className="drive-container">
          <iframe
            src={`https://drive.google.com/embeddedfolderview?id=${course.folderId}#grid`}
            className="drive-iframe"
            allowFullScreen
            title={course.name}
          />
        </div>
      )}
    </div>
  );
};

export default CoursePage;
