import { useOutletContext } from "react-router-dom";

export default function ShipStatus() {
  const data = useOutletContext();
  return (
    <div className="shipStatus--layout">
      <div className="shipStatus">
        <div className="shipStatus--element">
          <h3 className="shipStatus--element--header">Position</h3>
          <p className="shipStatus--element--details">
            {data.nav.waypointSymbol}
          </p>
        </div>
        <div className="shipStatus--element">
          <h3 className="shipStatus--element--header">Status</h3>
          <p className="shipStatus--element--details">{data.nav.status}</p>
        </div>
        <div className="shipStatus--element">
          <h3 className="shipStatus--element--header">Fuel</h3>
          <p className="shipStatus--element--details">
            {data.fuel.current}/{data.fuel.capacity}
          </p>
        </div>
        <div className="shipStatus--element">
          <h3 className="shipStatus--element--header">Flightmode</h3>
          <p className="shipStatus--element--details">{data.nav.flightMode}</p>
        </div>
      </div>
    </div>
  );
}
