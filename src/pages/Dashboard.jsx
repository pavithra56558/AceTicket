import { useEffect, useState } from "react";

function Dashboard() {

  const [bookings, setBookings] = useState([]);

  // LOAD BOOKINGS

  useEffect(() => {

    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(savedBookings);

  }, []);

  // CANCEL BOOKING

  const cancelBooking = (indexToDelete) => {

    const updatedBookings = bookings.filter(
      (_, index) => index !== indexToDelete
    );

    setBookings(updatedBookings);

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    alert("Booking Cancelled");

  };

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
          marginBottom: "50px",
          fontSize: "55px"
        }}
      >
        📋 My Bookings
      </h1>

      {bookings.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "24px",
            marginTop: "100px"
          }}
        >
          No bookings found
        </div>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px"
          }}
        >

          {bookings.map((booking, index) => (

            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "20px",
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.3)"
              }}
            >

              <h2
                style={{
                  marginBottom: "20px",
                  color: "#111827"
                }}
              >
                🎟 {booking.eventName}
              </h2>

              <p style={textStyle}>
                <strong>👤 Name:</strong>
                {" "}
                {booking.customerName}
              </p>

              <p style={textStyle}>
                <strong>📧 Email:</strong>
                {" "}
                {booking.email}
              </p>

              <p style={textStyle}>
                <strong>💺 Seats:</strong>
                {" "}
                {booking.seats.join(", ")}
              </p>

              <p style={textStyle}>
                <strong>💰 Total:</strong>
                {" "}
                ₹{booking.total}
              </p>

              <button
                onClick={() => cancelBooking(index)}
                style={{
                  marginTop: "25px",
                  width: "100%",
                  padding: "15px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Cancel Booking
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

const textStyle = {
  marginBottom: "12px",
  fontSize: "17px",
  color: "#374151"
};

export default Dashboard;