import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthRequired() {
  // Import context
  const { authToken } = useContext(AuthContext);
  // Login state. Set to null to prevent returning before fetch request finished
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const request = async () => {
      const response = await fetch(
        "https://api.spacetraders.io/v2/my/agent",
        options
      );

      if (!response.ok) {
        console.log(response.status);
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    };

    request();
  }, [authToken]);

  // Wait until fetch request finished, then return either the requested content or the login page
  if (isLoggedIn === false) {
    console.log("return");
    // Return to login page
    return <Navigate to="/" />;
  } else if (isLoggedIn) {
    // Return the requested content
    return <Outlet />;
  }
}
