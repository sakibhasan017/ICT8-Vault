import React, { useState } from "react";
import "./Performance.css";

const Performance = () => {
  const [ctMarks, setCtMarks] = useState(Array(4).fill({ got: "", max: 10 }));
  const [mid, setMid] = useState({ got: "", max: 20 });
  const [assignment, setAssignment] = useState({ got: "", max: 10 });
  const [attendance, setAttendance] = useState({ got: "", max: 10 });
  const [markResult, setMarkResult] = useState("");
  const calculateMarkMaster = () => {
    let convertedCTs = ctMarks.map(ct =>
      (parseFloat(ct.got || 0) / parseFloat(ct.max || 1)) * 10
    );
    let best3 = convertedCTs.sort((a, b) => b - a).slice(0, 3);
    let ctAvg = Math.ceil(best3.reduce((a, b) => a + b, 0) / 3);
    let midConverted = (parseFloat(mid.got || 0) / parseFloat(mid.max || 1)) * 20;
    let assignConverted = (parseFloat(assignment.got || 0) / parseFloat(assignment.max || 1)) * 10;
    let attendConverted = parseFloat(attendance.got || 0);
    let totalIncourse = ctAvg + midConverted + assignConverted + attendConverted;
    let AplusNeed = Math.max(0, ((80 - totalIncourse) * 2).toFixed(2));
    let ANeed = Math.max(0, ((75 - totalIncourse) * 2).toFixed(2));
    let AminusNeed = Math.max(0, ((70 - totalIncourse) * 2).toFixed(2));
    let BplusNeed = Math.max(0, ((65 - totalIncourse) * 2).toFixed(2));
    let BNeed = Math.max(0, ((60 - totalIncourse) * 2).toFixed(2));
    let BMinus = Math.max(0, ((55 - totalIncourse) * 2).toFixed(2));
    let CNeed = Math.max(0, ((50 - totalIncourse) * 2).toFixed(2));
    let DNeed = Math.max(0, ((45 - totalIncourse) * 2).toFixed(2));
    let passNeed = Math.max(0, ((40 - totalIncourse) * 2).toFixed(2));
    setMarkResult(
      `Your Incourse Total: ${totalIncourse.toFixed(2)} / 50
      \nTo get A+ you need ${AplusNeed} in final.
      \nTo get A you need ${ANeed} in final.
      \nTo get A- you need ${AminusNeed} in final.
      \nTo get B+ you need ${BplusNeed} in final.
      \nTo get B you need ${BNeed} in final.
      \nTo get B- you need ${BMinus} in final.
      \nTo get C you need ${CNeed} in final.
      \nTo get D you need ${DNeed} in final.
      \nTo get PASS you need ${passNeed} in final.`
    );
  };

  const [attTotal, setAttTotal] = useState("");
  const [attPresent, setAttPresent] = useState("");
  const [attResult, setAttResult] = useState("");
  const calculateAttendance = () => {
    let percentage = ((attPresent / attTotal) * 100).toFixed(2);
    setAttResult(`Attendance: ${percentage}%`);
  };

  const [courses, setCourses] = useState([]);
  const [predResult, setPredResult] = useState("");
  const performanceMap = { good: 40, moderate: 30, poor: 20 };
  const addCourse = () => {
    setCourses([...courses, { credit: 3, incourse: "", level: "moderate" }]);
  };
  const calculatePrediction = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      let finalScore = parseFloat(c.incourse || 0) + performanceMap[c.level];
      let gradePoint =
        finalScore >= 80 ? 4 :
        finalScore >= 75 ? 3.75 :
        finalScore >= 70 ? 3.5 :
        finalScore >= 65 ? 3.25 :
        finalScore >= 60 ? 3 :
        finalScore >= 55 ? 2.75 :
        finalScore >= 50 ? 2.5 :
        finalScore >= 45 ? 2.25 :
        finalScore >= 40 ? 2 : 0;
      totalPoints += gradePoint * parseFloat(c.credit);
      totalCredits += parseFloat(c.credit);
    });
    setPredResult(`Predicted GPA: ${(totalPoints / totalCredits).toFixed(2)}`);
  };

  const [semesters, setSemesters] = useState([]);
  const [cgpaResult, setCgpaResult] = useState("");
  const addSemester = () => {
    setSemesters([...semesters, { gpa: "", credit: "" }]);
  };
  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    semesters.forEach(s => {
      totalPoints += parseFloat(s.gpa || 0) * parseFloat(s.credit || 0);
      totalCredits += parseFloat(s.credit || 0);
    });
    setCgpaResult(`Overall CGPA: ${(totalPoints / totalCredits).toFixed(2)}`);
  };

  return (
    <div className="per123-performance-container">
      <h1 className="per123-page-title">🎯 Performance Hub</h1>

      <section className="per123-card">
        <h2>🧮 Mark Master</h2>
        {ctMarks.map((ct, i) => (
          <div key={i} className="per123-input-row">
            <input type="number" placeholder={`CT${i+1} Got`} value={ct.got}
              onChange={e => {
                let copy = [...ctMarks];
                copy[i] = { ...copy[i], got: e.target.value };
                setCtMarks(copy);
              }} />
            <input type="number" placeholder={`CT${i+1} Max`} value={ct.max}
              onChange={e => {
                let copy = [...ctMarks];
                copy[i] = { ...copy[i], max: e.target.value };
                setCtMarks(copy);
              }} />
          </div>
        ))}
        <div className="per123-input-row">
          <input type="number" placeholder="Mid Got" value={mid.got}
            onChange={e => setMid({ ...mid, got: e.target.value })} />
          <input type="number" placeholder="Mid Max" value={mid.max}
            onChange={e => setMid({ ...mid, max: e.target.value })} />
        </div>
        <div className="per123-input-row">
          <input type="number" placeholder="Assignment Got" value={assignment.got}
            onChange={e => setAssignment({ ...assignment, got: e.target.value })} />
          <input type="number" placeholder="Assignment Max" value={assignment.max}
            onChange={e => setAssignment({ ...assignment, max: e.target.value })} />
        </div>
        <div className="per123-input-row">
          <input type="number" placeholder="Attendance" value={attendance.got}
            onChange={e => setAttendance({ ...attendance, got: e.target.value })} />
          <input type="number" placeholder="Attendance Max" value={attendance.max}
            onChange={e => setAttendance({ ...attendance, max: e.target.value })} />
        </div>
        <button onClick={calculateMarkMaster}>Calculate</button>
        <pre class="per123-p">{markResult}</pre>
      </section>

      <section className="per123-card">
        <h2>📅 Presence Power</h2>
        <input type="number" placeholder="Total Classes" value={attTotal} onChange={e => setAttTotal(e.target.value)} />
        <input type="number" placeholder="Classes Attended" value={attPresent} onChange={e => setAttPresent(e.target.value)} />
        <button onClick={calculateAttendance}>Calculate</button>
        <p className="per123-p">{attResult}</p>
      </section>

      <section className="per123-card">
        <h2>🔮 Crystal Grade</h2>
        <p className="per123-disclaimer">⚠ This is only a prediction for mental stability purposes. Do not fully trust this result.</p>
        {courses.map((c, idx) => (
          <div key={idx} className="per123-input-row">
            <select className="pre123-slt" value={c.credit} onChange={e => {
              let copy = [...courses];
              copy[idx].credit = e.target.value;
              setCourses(copy);
            }}>
              {[0.75, 1, 1.5, 3].map(val => <option key={val} value={val}>{val}</option>)}
            </select>
            <input type="number" placeholder="Incourse Mark" value={c.incourse} onChange={e => {
              let copy = [...courses];
              copy[idx].incourse = e.target.value;
              setCourses(copy);
            }} />
            <select className="pre123-slt" value={c.level} onChange={e => {
              let copy = [...courses];
              copy[idx].level = e.target.value;
              setCourses(copy);
            }}>
              <option value="good">Good</option>
              <option value="moderate">Moderate</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        ))}
        <button onClick={addCourse}>Add Course</button>
        <button onClick={calculatePrediction}>Calculate Prediction</button>
        <p className="per123-p">{predResult}</p>
      </section>

      <section className="per123-card">
        <h2>👑 CGPA Crown</h2>
        {semesters.map((s, idx) => (
          <div key={idx} className="per123-input-row">
            <input type="number" placeholder="Semester GPA" value={s.gpa} onChange={e => {
              let copy = [...semesters];
              copy[idx].gpa = e.target.value;
              setSemesters(copy);
            }} />
            <input type="number" placeholder="Semester Credits" value={s.credit} onChange={e => {
              let copy = [...semesters];
              copy[idx].credit = e.target.value;
              setSemesters(copy);
            }} />
          </div>
        ))}
        <button onClick={addSemester}>Add Semester</button>
        <button onClick={calculateCGPA}>Calculate CGPA</button>
        <p className="per123-p">{cgpaResult}</p>
      </section>
    </div>
  );
};

export default Performance;
