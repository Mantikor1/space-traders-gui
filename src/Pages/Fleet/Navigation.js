import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AuthContext from "../../Components/AuthContext";

export default function Navigation() {
  const { authToken } = useContext(AuthContext);
  const [waypoints, setWaypoints] = useState([]);
  const [orbit, setOrbit] = useState(false);
  const data = useOutletContext();

  useEffect(() => {
    const options = {
      header: {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      },
    };
    const request = async () => {
      const response = await fetch(
        `https://api.spacetraders.io/v2/systems/${data.nav.systemSymbol}/waypoints`,
        options
      );
      if (!response.ok) {
        console.log(response.status);
        return;
      }

      const waypointData = await response.json();
      setWaypoints(waypointData.data);
    };
    request();
    setOrbit(data.nav.status === "DOCKED" ? true : false);
  }, [authToken, data.nav.systemSymbol, data.nav.status]);

  const waypointsOptions = waypoints.map((waypoint) => {
    return <option key={waypoint.symbol}>{waypoint.symbol}</option>;
  });

  async function navigationHandler() {}

  function orbitEventHandler(event) {
    setOrbit(event.target.checked);
  }

  return (
    <div className="navigation">
      <div className="navigation--element">
        <h3 className="navigation--element--header">Navigation</h3>
        <div className="navigation--element--navigation--actions">
          <p>Navigate to</p>
          <select>{waypointsOptions}</select>
          <button>Start</button>
        </div>
        <div className="navigation--element">
          <h3 className="navigation--element--header">Status</h3>
          <p className="navigation--element--status--option">Orbit</p>
          <label className="navigation--element--status--switch">
            <input
              type="checkbox"
              checked={orbit}
              onChange={orbitEventHandler}
            />
            <span className="navigation--element--status--switch--slider"></span>
          </label>
          <p className="navigation--element--status--option">Docked</p>
        </div>
        <div className="navigation--element">
          <h3 className="navigation--element--header">Actions</h3>
          <button className="navigation--element--actions--extract">
            Extract
          </button>
          <button className="navigation--element--actions--refuel">
            Refuel
          </button>
        </div>
      </div>
    </div>
  );
}
