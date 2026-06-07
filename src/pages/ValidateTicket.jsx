import { useState } from "react";

function ValidateTicket() {
  const [bookingId, setBookingId] = useState("");
  const [result, setResult] = useState(null);

  const validateTicket = () => {
    const bookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];

    const ticket = bookings.find(
      (booking) => String(booking.id) === bookingId
    );

    if (ticket) {
      // CHECK IF TICKET ALREADY USED
      if (ticket.used) {
        setResult({
          valid: "used",
          ticket
        });
        return;
      }

      // MARK TICKET AS USED
      const updatedBookings = bookings.map((booking) =>
        booking.id === ticket.id
          ? { ...booking, used: true }
          : booking
      );

      localStorage.setItem(
        "myBookings",
        JSON.stringify(updatedBookings)
      );

      setResult({
        valid: true,
        ticket: {
          ...ticket,
          used: true
        }
      });
    } else {
      setResult({
        valid: false
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,#0f172a,#1e293b)"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          width: "500px",
          textAlign: "center",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.3)"
        }}
      >
        <h1>🎫 Validate Ticket</h1>

        <input
          type="text"
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) =>
            setBookingId(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />

        <button
          onClick={validateTicket}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Validate Ticket
        </button>

        {result && (
          <div style={{ marginTop: "25px" }}>
            {result.valid === true ? (
              <div
                style={{
                  background: "#dcfce7",
                  padding: "20px",
                  borderRadius: "15px",
                  textAlign: "left"
                }}
              >
                <h2
                  style={{
                    color: "#16a34a",
                    textAlign: "center"
                  }}
                >
                  ✅ VALID TICKET
                </h2>

                <p>
                  <strong>🎟 Event:</strong>{" "}
                  {result.ticket.eventName}
                </p>

                <p>
                  <strong>👤 Customer:</strong>{" "}
                  {result.ticket.customerName}
                </p>

                <p>
                  <strong>🎫 Seats:</strong>{" "}
                  {result.ticket.seats.join(", ")}
                </p>

                <p>
                  <strong>💰 Amount:</strong> ₹
                  {result.ticket.total}
                </p>

                <p>
                  <strong>🆔 Booking ID:</strong>{" "}
                  {result.ticket.id}
                </p>
              </div>
            ) : result.valid === "used" ? (
              <div
                style={{
                  background: "#fef3c7",
                  padding: "20px",
                  borderRadius: "15px"
                }}
              >
                <h2 style={{ color: "#d97706" }}>
                  ⚠️ TICKET ALREADY USED
                </h2>

                <p>
                  This ticket has already been validated.
                </p>
              </div>
            ) : (
              <div
                style={{
                  background: "#fee2e2",
                  padding: "20px",
                  borderRadius: "15px"
                }}
              >
                <h2 style={{ color: "#dc2626" }}>
                  ❌ INVALID TICKET
                </h2>

                <p>
                  No booking found for this ID.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ValidateTicket;