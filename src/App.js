import './App.css';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import {Dashboard , Registration, DailyAttendance, Analysis} from "./pages"

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/daily-attendance" element={<DailyAttendance/>} />
      <Route path="/analysis" element={<Analysis/>} />
    </Routes>
    </Router></div>
  );
}

export default App;
