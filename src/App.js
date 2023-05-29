import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Login/Registration";
import LoginLayout from "./Pages/Login/LoginLayout";
import DashboardLayout from "./Components/DashboardLayout";
import Fleet from "./Pages/Fleet/Fleet";
import { AuthContext } from "./Components/AuthContext";
import { useState } from "react";

export default function App() {
  const [authTokens, setAuthTokens] = useState("this is a test");

  const setTokens = (data) => {
    setAuthTokens(data);
  };
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Routes>
          <Route path="/" element={<LoginLayout />}>
            <Route index element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Fleet />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
