import { Outlet } from "react-router-dom";
import LoginNavbar from "../../Components/LoginNavbar";

export default function LoginLayout() {
  return (
    <div className="wrapper">
      <LoginNavbar />
      <Outlet />
    </div>
  );
}
