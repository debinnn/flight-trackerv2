import { useEffect, useState } from "react";
import { getFlights } from "../api/aviation";

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (err) {
        setError("Failed to load flights");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading flights...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>✈️ Flight List</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.flight.iata}>
            {flight.airline.name} — {flight.flight.iata}  
            ({flight.departure.airport} → {flight.arrival.airport})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightList;
