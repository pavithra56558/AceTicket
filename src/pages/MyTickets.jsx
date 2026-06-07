import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];

    setTickets(savedBookings);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(to right, #0f172a, #1e293b, #334155)"
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        🎫 My Tickets
      </h1>

      {tickets.length === 0 ? (
        <p
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "20px"
          }}
        >
          No tickets purchased yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px"
          }}
        >
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.2)"
              }}
            >
              <h2>{ticket.eventName}</h2>

              <p>
                📍 <strong>Location:</strong>{" "}
                {ticket.location}
              </p>

              <p>
                🎟 <strong>Seats:</strong>{" "}
                {ticket.seats.join(", ")}
              </p>

              <p>
                👤 <strong>Name:</strong>{" "}
                {ticket.customerName}
              </p>

              <p>
                💰 <strong>Total:</strong> ₹
                {ticket.total}
              </p>

              <p>
                🆔 <strong>Booking ID:</strong>{" "}
                {ticket.id}
              </p>

              <button
                onClick={() =>
                  navigate(`/ticket/${ticket.id}`)
                }
                style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "12px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                🎟 View Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;