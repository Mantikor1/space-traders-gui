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
        // Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiTUFOVElLT1JURVNUNCIsInZlcnNpb24iOiJ2MiIsInJlc2V0X2RhdGUiOiIyMDIzLTA1LTIwIiwiaWF0IjoxNjg1MjIxNjUzLCJzdWIiOiJhZ2VudC10b2tlbiJ9.Yi2wuT2RAGtxQIxFcGM6DgSqOjZJw-5fCmnixcfmWeC0JLHFkqOAgK4fypQFYMXoYV8qDnznUOvHYKkMnqQ7PAu_ud078ER0IiwN1VfWeCc4jLm3zKWOVXehfUqRezHYnTYXJIBYYY7pkNHYIxAOZhlRbqYYT58pMY1mKQSCVdk7C-2RXD2tQYTOIQ9Do4TXe1zHGHd3oZR4aMhfD5xtULKj-tteKl5rj3a-mn3y-3QKItArPi0diYnlqB2FJxSUOTHQ690GdKOJy7rdBPW6RxhxZ_wI-6tZb4rUSQDfXtPMqkUdcXsM-JLBjPvMjUN-rAqDCGtm0AQRVVDqozFz1w`,
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
    // Return to login page
    return <Navigate to="/" />;
  } else if (isLoggedIn) {
    // Return the requested content
    return <Outlet />;
  }
}
