import { useState } from "react";
import { getFlightByNumber } from "../api/aviation";

function FlightTracker() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!flightNumber.trim()) return;
    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const data = await getFlightByNumber(flightNumber);
      if (data.length === 0) setError("No flight found.");
      else setFlightData(data[0]); // usually one flight
    } catch (err) {
      setError("Failed to fetch flight data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🛫 Flight Tracker</h1>
      <input
        type="text"
        placeholder="Enter flight number (e.g., AI101)"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {flightData && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#f9f9f9",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          <h2>
            {flightData.airline?.name} ({flightData.flight?.iata})
          </h2>
          <p><strong>Status:</strong> {flightData.flight_status}</p>
          <p><strong>From:</strong> {flightData.departure?.airport} ({flightData.departure?.iata})</p>
          <p><strong>To:</strong> {flightData.arrival?.airport} ({flightData.arrival?.iata})</p>
          <p><strong>Departure Time:</strong> {flightData.departure?.scheduled}</p>
          <p><strong>Arrival Time:</strong> {flightData.arrival?.scheduled}</p>
        </div>
      )}
    </div>
  );
}

export default FlightTracker;
