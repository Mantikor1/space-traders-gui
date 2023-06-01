import { Link, Outlet, useParams } from "react-router-dom";
import ArrowBack from "../assets/arrow_back.svg";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function ShipStatusNavbar() {
  const { authToken } = useContext(AuthContext);
  const params = useParams();
  const [shipDetails, setShipDetails] = useState({
    symbol: "",
    frame: "",
  });

  useEffect(() => {
    const request = async () => {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await fetch(
        `https://api.spacetraders.io/v2/my/ships/${params.id}`,
        options
      );

      if (!response.ok) {
        console.log(response.status);
      }

      const { data } = await response.json();
      setShipDetails({
        symbol: data.symbol,
        frame: data.frame.name,
      });
    };
    request();
  }, [authToken, params.id]);

  return (
    <div className="shipStatusNavbar">
      <div className="shipStatusNavbar--back--layout">
        <Link to=".." style={{ textDecoration: "none" }}>
          <div className="shipStatusNavbar--back">
            <img src={ArrowBack} alt="Arrow Back" width="20px" height="20px" />
            <h3 className="shipStatusNavbar--back--text">Back to ships</h3>
          </div>
        </Link>
      </div>
      <div className="shipStatusNavbar--shipname">
        <h1 className="shipStatusNavbar--shipname--header">
          {shipDetails.symbol}
        </h1>
        <h2 className="shipStatusNavbar--shipname--frame">
          {shipDetails.frame}
        </h2>
      </div>
      <div className="shipStatusNavbar--nav">
        <Link to="." className="shipStatusNavbar--nav--link">
          Status
        </Link>
        <Link to="navigation" className="shipStatusNavbar--nav--link">
          Navigation
        </Link>
        <Link to="cargo" className="shipStatusNavbar--nav--link">
          Cargo
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
