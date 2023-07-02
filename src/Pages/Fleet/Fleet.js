import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Components/AuthContext";
import GasStation from "../../assets/Gas_Station.svg";

export default function Fleet() {
	// Import context for token
	const { authToken } = useContext(AuthContext);

	// Create a state to hold the ships array
	const [ships, setShips] = useState([]);

	// Get request for a list of all ships owned by the user
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
				"https://api.spacetraders.io/v2/my/ships/",
				options
			);

			if (!response.ok) {
				console.log(response.status);
				return;
			}

			const { data } = await response.json();
			setShips(data);
		};
		request();
	}, [authToken]);

	console.log(ships);

	// Map over the ship array and create a div for each element
	const shipElements = ships.map((ship) => {
		const fuelPercentage = (ship.fuel.current / ship.fuel.capacity) * 100;
		return (
			<Link
				to={ship.symbol}
				// Remove decoration
				style={{ textDecoration: "none" }}
				key={ship.symbol}
			>
				<div className="fleet--ship">
					<p style={{ fontWeight: 700 }}>{ship.symbol}</p>
					<div className="fleet--ship--details">
						<p>{ship.nav.waypointSymbol}</p>
						<p>{ship.nav.status}</p>
						<img
							src={GasStation}
							alt="Gas Station"
							width="40px"
							height="40px"
						/>
						<p>{fuelPercentage}%</p>
					</div>
				</div>
			</Link>
		);
	});

	return (
		<div className="fleet">
			<h1 className="fleet--header">Fleet</h1>
			{shipElements}
		</div>
	);
}
