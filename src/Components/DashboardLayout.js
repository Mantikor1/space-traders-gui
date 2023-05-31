import Navbar from "./Navbar";
import AccountInfo from "./AccountInfo";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="mainContent">
        <AccountInfo />
        <Outlet />
      </div>
    </div>
  );
}
