function AdminDashboard() {
  const bookings =
    JSON.parse(localStorage.getItem("myBookings")) || [];

  const totalTickets = bookings.length;

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.total,
    0
  );

  const usedTickets = bookings.filter(
    (booking) => booking.used
  ).length;

  const unusedTickets =
    totalTickets - usedTickets;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(to right,#0f172a,#1e293b)"
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        📊 Admin Dashboard
      </h1>

      {/* STATS CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        <div style={card}>
          <h2>{totalTickets}</h2>
          <p>Total Tickets</p>
        </div>

        <div style={card}>
          <h2>₹{totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div style={card}>
          <h2>{usedTickets}</h2>
          <p>Used Tickets</p>
        </div>

        <div style={card}>
          <h2>{unusedTickets}</h2>
          <p>Unused Tickets</p>
        </div>
      </div>

      {/* BOOKINGS TABLE */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          overflowX: "auto"
        }}
      >
        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          🎟 All Bookings
        </h2>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f1f5f9"
                }}
              >
                <th style={th}>Booking ID</th>
                <th style={th}>Customer</th>
                <th style={th}>Event</th>
                <th style={th}>Seats</th>
                <th style={th}>Amount</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={td}>
                    {booking.id}
                  </td>

                  <td style={td}>
                    {booking.customerName}
                  </td>

                  <td style={td}>
                    {booking.eventName}
                  </td>

                  <td style={td}>
                    {booking.seats.join(", ")}
                  </td>

                  <td style={td}>
                    ₹{booking.total}
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        padding:
                          "6px 12px",
                        borderRadius:
                          "999px",
                        color: "white",
                        fontWeight:
                          "bold",
                        background:
                          booking.used
                            ? "#16a34a"
                            : "#2563eb"
                      }}
                    >
                      {booking.used
                        ? "Used"
                        : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center"
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

export default AdminDashboard;