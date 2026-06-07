import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  // SEARCH STATE

  const [searchTerm, setSearchTerm] = useState("");

  // EVENTS DATA

  const events = [
    {
      id: 1,
      name: "IPL Final 2027",
      location: "Narendra Modi Stadium",
      price: 2500,
      capacity: 132000
    },
    {
      id: 2,
      name: "CSK vs RCB",
      location: "Chepauk Stadium",
      price: 1800,
      capacity: 42000
    },
    {
      id: 3,
      name: "Wimbledon Finals",
      location: "London Centre Court",
      price: 5000,
      capacity: 30000
    },
    {
      id: 4,
      name: "Manchester United vs Liverpool",
      location: "Old Trafford",
      price: 4500,
      capacity: 76000
    }
  ];

  // FILTER EVENTS

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // STATES

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");

  const [selectedSeats, setSelectedSeats] = useState([]);

  // BOOKED SEATS

  const [bookedSeats, setBookedSeats] = useState(() => {

    const savedSeats =
      localStorage.getItem("bookedSeats");

    return savedSeats
      ? JSON.parse(savedSeats)
      : [];
  });

  // BOOKINGS

  const [myBookings, setMyBookings] = useState(() => {

    const savedBookings =
      localStorage.getItem("myBookings");

    return savedBookings
      ? JSON.parse(savedBookings)
      : [];
  });

  const [successMessage, setSuccessMessage] = useState("");

  // SAVE LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "bookedSeats",
      JSON.stringify(bookedSeats)
    );

  }, [bookedSeats]);

  useEffect(() => {

    localStorage.setItem(
      "myBookings",
      JSON.stringify(myBookings)
    );

  }, [myBookings]);

  // STADIUM SECTIONS

  const stadiumSections = [

    { id: "A1", type: "economy", booked: false },
    { id: "A2", type: "economy", booked: false },
    { id: "A3", type: "economy", booked: true },
    { id: "A4", type: "economy", booked: false },

    { id: "B1", type: "premium", booked: false },
    { id: "B2", type: "premium", booked: false },
    { id: "B3", type: "premium", booked: true },
    { id: "B4", type: "premium", booked: false },

    { id: "C1", type: "vip", booked: false },
    { id: "C2", type: "vip", booked: true },
    { id: "C3", type: "vip", booked: false },
    { id: "C4", type: "vip", booked: false },

    { id: "D1", type: "economy", booked: false },
    { id: "D2", type: "economy", booked: false },
    { id: "D3", type: "economy", booked: false },
    { id: "D4", type: "economy", booked: true },

    { id: "E1", type: "premium", booked: false },
    { id: "E2", type: "premium", booked: false },
    { id: "E3", type: "premium", booked: false },
    { id: "E4", type: "premium", booked: true }
  ];

  // SELECT SEAT

  const handleSeatClick = (seat) => {

    if (
      seat.booked ||
      bookedSeats.includes(seat.id)
    ) {
      return;
    }

    if (selectedSeats.includes(seat.id)) {

      setSelectedSeats(
        selectedSeats.filter((id) => id !== seat.id)
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat.id
      ]);
    }
  };

  // TOTAL PRICE

  const calculateTotal = () => {

    let total = 0;

    selectedSeats.forEach((seatId) => {

      const seat = stadiumSections.find(
        (s) => s.id === seatId
      );

      if (seat.type === "economy") {
        total += selectedEvent.price;
      }

      else if (seat.type === "premium") {
        total += selectedEvent.price + 1000;
      }

      else if (seat.type === "vip") {
        total += selectedEvent.price + 2500;
      }
    });

    return total;
  };

  // BOOKING

  const handleBooking = () => {

    if (
      !customerName ||
      !email ||
      selectedSeats.length === 0
    ) {

      alert("Please fill all details");

      return;
    }

    // SUCCESS MESSAGE

    setSuccessMessage(
      `🎉 ${customerName}, your section(s) ${selectedSeats.join(
        ", "
      )} booked successfully for ${selectedEvent.name}`
    );

    // SAVE BOOKED SEATS

    setBookedSeats([
      ...bookedSeats,
      ...selectedSeats
    ]);

    // SAVE BOOKING

    // SAVE BOOKING

const bookingData = {
  id: Date.now(),
  eventName: selectedEvent.name,
  location: selectedEvent.location,
  seats: selectedSeats,
  total: calculateTotal(),
  customerName,
  email
};

setMyBookings([
  ...myBookings,
  bookingData
]);

// SAVE PAYMENT DATA FOR PAYMENT PAGE

localStorage.setItem(
  "paymentData",
  JSON.stringify(bookingData)
);

// GO TO PAYMENT PAGE

navigate("/payment"); 
 };

  // CANCEL BOOKING

  const cancelBooking = (bookingId, seatsToRemove) => {

    // REMOVE BOOKING CARD

    const updatedBookings = myBookings.filter(
      (booking) => booking.id !== bookingId
    );

    setMyBookings(updatedBookings);

    // FREE SEATS

    const updatedSeats = bookedSeats.filter(
      (seat) => !seatsToRemove.includes(seat)
    );

    setBookedSeats(updatedSeats);

    alert("Booking Cancelled Successfully");
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

      {/* HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px"
        }}
      >

        <h1
          style={{
            color: "white",
            fontSize: "65px",
            marginBottom: "10px"
          }}
        >
          🎟 Stadium Events
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "20px"
          }}
        >
          Book live sports tickets with real stadium seating
        </p>

      </div>

      {/* SEARCH BAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px"
        }}
      >

        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            width: "400px",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)"
          }}
        />

      </div>

      {/* EVENT CARDS */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px"
        }}
      >

        {filteredEvents.map((event) => (

          <div
            key={event.id}
            style={{
              width: "320px",
              backgroundColor: "white",
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
            }}
          >

            {/* TOP AREA */}

            <div
              style={{
                height: "180px",
                background:
                  "linear-gradient(to right, #2563eb, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "70px"
              }}
            >
              🏟
            </div>

            {/* CONTENT */}

            <div
              style={{
                padding: "25px"
              }}
            >

              <h2>
                {event.name}
              </h2>

              <p>
                <strong>📍 Location:</strong>
                {" "}
                {event.location}
              </p>

              <p>
                <strong>💺 Capacity:</strong>
                {" "}
                {event.capacity.toLocaleString()}
              </p>

              <p>
                <strong>💰 Starting Price:</strong>
                {" "}
                ₹{event.price}
              </p>

              <button
                onClick={() => {

                  setSelectedEvent(event);

                  setSelectedSeats([]);

                  setSuccessMessage("");
                }}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  background:
                    "linear-gradient(to right, #2563eb, #7c3aed)",
                  color: "white",
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Book Ticket
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* BOOKING SECTION */}

      {selectedEvent && (

        <div
          style={{
            marginTop: "70px",
            backgroundColor: "white",
            borderRadius: "30px",
            padding: "40px",
            maxWidth: "1200px",
            marginInline: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
          }}
        >

          <h2
            style={{
              textAlign: "center",
              fontSize: "42px",
              marginBottom: "30px"
            }}
          >
            🏟 {selectedEvent.name}
          </h2>

          {/* LEGEND */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              marginBottom: "30px",
              flexWrap: "wrap",
              fontWeight: "bold"
            }}
          >

            <div>🩷 Economy</div>

            <div>🟦 Premium</div>

            <div>🟪 VIP</div>

            <div>🟥 Booked</div>

            <div>🟨 Selected</div>

          </div>

          {/* STADIUM */}

          <div
            style={{
              width: "780px",
              height: "780px",
              borderRadius: "50%",
              margin: "auto",
              position: "relative",
              background:
                "radial-gradient(circle, #16a34a 18%, #e5e7eb 19%, #e5e7eb 24%, white 25%)",
              border: "25px solid #d1d5db",
              overflow: "hidden"
            }}
          >

            {/* FIELD */}

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "34px",
                border: "8px solid white"
              }}
            >
              FIELD
            </div>

            {/* SEATS */}

            {stadiumSections.map((seat, index) => {

              const angle =
                (index / stadiumSections.length) *
                2 *
                Math.PI;

              const radius = 320;

              const x =
                390 +
                radius * Math.cos(angle) -
                45;

              const y =
                390 +
                radius * Math.sin(angle) -
                25;

              let backgroundColor = "#ff4da6";

              if (seat.type === "premium") {
                backgroundColor = "#0ea5e9";
              }

              if (seat.type === "vip") {
                backgroundColor = "#9333ea";
              }

              if (
                seat.booked ||
                bookedSeats.includes(seat.id)
              ) {
                backgroundColor = "#dc2626";
              }

              if (
                selectedSeats.includes(seat.id)
              ) {
                backgroundColor = "#facc15";
              }

              return (

                <div
                  key={seat.id}
                  onClick={() =>
                    handleSeatClick(seat)
                  }
                  style={{
                    position: "absolute",
                    left: `${x}px`,
                    top: `${y}px`,
                    width: "90px",
                    height: "50px",
                    backgroundColor,
                    color: "white",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    cursor:
                      seat.booked ||
                      bookedSeats.includes(seat.id)
                        ? "not-allowed"
                        : "pointer",
                    transition: "0.3s",
                    border: "2px solid white",
                    boxShadow:
                      "0 0 8px rgba(0,0,0,0.3)"
                  }}
                >
                  {seat.id}
                </div>

              );

            })}

          </div>

          {/* BOOKING DETAILS */}

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "40px"
            }}
          >

            {/* LEFT */}

            <div>

              <h3>
                Customer Details
              </h3>

              <input
                type="text"
                placeholder="Enter Your Name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                style={inputStyle}
              />

              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={inputStyle}
              />

            </div>

            {/* RIGHT */}

            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "25px",
                borderRadius: "20px"
              }}
            >

              <h3>
                Booking Summary
              </h3>

              <p>
                <strong>Event:</strong>
                {" "}
                {selectedEvent.name}
              </p>

              <p>
                <strong>Seats:</strong>
                {" "}
                {selectedSeats.length > 0
                  ? selectedSeats.join(", ")
                  : "No seats selected"}
              </p>

              <p>
                <strong>Total Seats:</strong>
                {" "}
                {selectedSeats.length}
              </p>

              <p
                style={{
                  fontSize: "24px",
                  marginTop: "20px",
                  fontWeight: "bold",
                  color: "#2563eb"
                }}
              >
                Total: ₹{calculateTotal()}
              </p>

              <button
                onClick={handleBooking}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  background:
                    "linear-gradient(to right, #16a34a, #22c55e)",
                  color: "white",
                  padding: "16px",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Confirm Booking
              </button>

            </div>

          </div>

          

          {/* MY BOOKINGS */}

          <div
            style={{
              marginTop: "60px"
            }}
          >

            <h2
              style={{
                marginBottom: "25px",
                textAlign: "center"
              }}
            >
              🎫 My Bookings
            </h2>

            {myBookings.length === 0 ? (

              <p
                style={{
                  textAlign: "center",
                  color: "gray"
                }}
              >
                No bookings yet
              </p>

            ) : (

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px"
                }}
              >

                {myBookings.map((booking) => (

                  <div
                    key={booking.id}
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "20px",
                      borderRadius: "18px",
                      boxShadow:
                        "0 5px 10px rgba(0,0,0,0.1)"
                    }}
                  >

                    <h3>
                      {booking.eventName}
                    </h3>

                    <p>
                      📍 {booking.location}
                    </p>

                    <p>
                      🎟 Seats:
                      {" "}
                      {booking.seats.join(", ")}
                    </p>

                    <p>
                      💰 Total:
                      {" "}
                      ₹{booking.total}
                    </p>

                    <p>
                      👤 {booking.customerName}
                    </p>

                    {/* CANCEL BUTTON */}

                    <button
                      onClick={() =>
                        cancelBooking(
                          booking.id,
                          booking.seats
                        )
                      }
                      style={{
                        marginTop: "15px",
                        width: "100%",
                        backgroundColor: "#dc2626",
                        color: "white",
                        padding: "12px",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      ❌ Cancel Booking
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

// INPUT STYLE

const inputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  marginBottom: "20px"
};

export default Events;