import { NavLink, Outlet, useParams } from "react-router-dom";
import ArrowBack from "../assets/arrow_back.svg";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function ShipStatusNavbar() {
  const { authToken } = useContext(AuthContext);

  // Get ship id from url parameters
  const params = useParams();
  const [shipDetails, setShipDetails] = useState({
    symbol: "",
    frame: {
      name: "",
    },
    nav: {
      waypointSymbol: "",
      status: "",
      flightMode: "",
    },
    fuel: {
      current: 0,
      capacity: 0,
    },
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
      setShipDetails(data);
    };
    request();
  }, [authToken, params.id]);

  return (
    <div className="shipStatusNavbar">
      <div className="shipStatusNavbar--back--layout">
        <NavLink to=".." style={{ textDecoration: "none" }}>
          <div className="shipStatusNavbar--back">
            <img src={ArrowBack} alt="Arrow Back" width="20px" height="20px" />
            <h3 className="shipStatusNavbar--back--text">Back to ships</h3>
          </div>
        </NavLink>
      </div>
      <div className="shipStatusNavbar--shipname">
        <h1 className="shipStatusNavbar--shipname--header">
          {shipDetails.symbol}
        </h1>
        <h2 className="shipStatusNavbar--shipname--frame">
          {shipDetails.frame.name}
        </h2>
      </div>
      <div className="shipStatusNavbar--nav">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive
              ? "shipStatusNavbar--nav--link--active"
              : "shipStatusNavbar--nav--link"
          }
        >
          Status
        </NavLink>
        <NavLink
          to="navigation"
          className={({ isActive }) =>
            isActive
              ? "shipStatusNavbar--nav--link--active"
              : "shipStatusNavbar--nav--link"
          }
        >
          Navigation
        </NavLink>
        <NavLink
          to="cargo"
          className={({ isActive }) =>
            isActive
              ? "shipStatusNavbar--nav--link--active"
              : "shipStatusNavbar--nav--link"
          }
        >
          Cargo
        </NavLink>
      </div>
      <Outlet context={shipDetails} />
    </div>
  );
}
