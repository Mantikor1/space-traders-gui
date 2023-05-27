import { Link } from "react-router-dom";

import Rocket from "../assets/rocket_launch.svg";
import Satellite from "../assets/satellite_alt.svg";
import Contract from "../assets/assignment.svg";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar--title">Space Traders</h1>
      <hr className="navbar--line" />
      <Link style={{ textDecoration: "none" }} to=".">
        <div className="navbar--item">
          <img className="navbar--item--icon" src={Rocket} alt="Rocket" />
          <h2 className="navbar--item--title">Fleet</h2>
        </div>
      </Link>
      <Link style={{ textDecoration: "none" }} to="systems">
        <div className="navbar--item">
          <img className="navbar--item--icon" src={Satellite} alt="Satellite" />
          <h2 className="navbar--item--title">Systems</h2>
        </div>
      </Link>
      <Link style={{ textDecoration: "none" }} to="contracts">
        <div className="navbar--item">
          <img className="navbar--item--icon" src={Contract} alt="Contract" />
          <h2 className="navbar--item--title">Contracts</h2>
        </div>
      </Link>
    </div>
  );
}
