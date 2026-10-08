import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./LoginPage";
import App from "../App";
import { DashBoardApp } from "./actualpage/DashBoardApp";
import Dashboarderror from "./actualpage/Dashboarderror";
export default function Customroute() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth" element={<LoginPage />} />
            {localStorage.getItem("JwtToken") ? (
              <Route path="/dashboard" element={<DashBoardApp />} />
            ) : (
              <Route path="/dashboard" element={<Dashboarderror />} />
            )}
          </Routes>
        </Router>
    </>
  );
}
