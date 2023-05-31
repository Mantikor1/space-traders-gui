import { useContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import AccountCircleWhite from "../assets/account_circle_white.svg";

export default function AccountInfo() {
  const { authToken } = useContext(AuthContext);

  const [accountDetails, setAccountDetails] = useState({
    symbol: "",
    credits: 0,
  });

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
      }

      const { data } = await response.json();

      setAccountDetails({
        symbol: data.symbol,
        credits: data.credits,
      });
    };
    request();
  }, [authToken]);
  return (
    <div className="accountDetails">
      <p className="accountDetails--credits">{accountDetails.credits} c</p>
      <img src={AccountCircleWhite} alt="Account symbol" />
      <p className="accountDetails--name">{accountDetails.symbol}</p>
    </div>
  );
}
