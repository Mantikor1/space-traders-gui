import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Login/Registration";
import LoginLayout from "./Pages/Login/LoginLayout";
import DashboardLayout from "./Components/DashboardLayout";
import Fleet from "./Pages/Fleet/Fleet";
import AuthContext from "./Components/AuthContext";
import AuthRequired from "./Components/AuthRequired";
import ShipStatus from "./Pages/Fleet/ShipStatus";
import ShipStatusNavbar from "./Components/ShipStatusNavbar";
import Navigation from "./Pages/Fleet/Navigation";
import Cargo from "./Pages/Fleet/Cargo";

export default function App() {
  const [authToken, setAuthToken] = useState("");

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authToken, setAuthToken }}>
        <Routes>
          <Route path="/" element={<LoginLayout />}>
            <Route index element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Route>
          {/* This routes require authentication. 
          The AuthRequired element makes a fetch request 
          with the user token from context and either 
          returns the outlet or the login page */}
          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Fleet />} />
              <Route path=":id" element={<ShipStatusNavbar />}>
                <Route index element={<ShipStatus />} />
                <Route path="navigation" element={<Navigation />} />
                <Route path="cargo" element={<Cargo />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
