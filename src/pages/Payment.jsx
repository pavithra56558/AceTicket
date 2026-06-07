import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();

  const bookingData = JSON.parse(
    localStorage.getItem("paymentData")
  );

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!bookingData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px"
        }}
      >
        No booking data found.
      </div>
    );
  }

  const handlePayment = () => {
    if (
      !cardName ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      alert("Please fill all payment details");
      return;
    }

    if (cardNumber.length !== 16) {
      alert("Card number must be 16 digits");
      return;
    }

    if (cvv.length !== 3) {
      alert("CVV must be 3 digits");
      return;
    }

    // GET EXISTING BOOKINGS

    const bookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];

    // PREVENT DUPLICATE BOOKINGS

    const alreadyExists = bookings.some(
      (booking) =>
        String(booking.id) ===
        String(bookingData.id)
    );

    if (!alreadyExists) {
      bookings.push(bookingData);

      localStorage.setItem(
        "myBookings",
        JSON.stringify(bookings)
      );
    }

    // SAVE BOOKED SEATS

    const bookedSeats =
      JSON.parse(localStorage.getItem("bookedSeats")) || [];

    localStorage.setItem(
      "bookedSeats",
      JSON.stringify([
        ...bookedSeats,
        ...bookingData.seats
      ])
    );

    localStorage.removeItem("paymentData");

    alert(
      `Payment Successful ✅\nTransaction ID: TXN${Date.now()}`
    );

    navigate("/success");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>
          💳 Secure Payment
        </h1>

        <h2 style={eventName}>
          {bookingData.eventName}
        </h2>

        <p style={details}>
          <strong>Seats:</strong>{" "}
          {bookingData.seats.join(", ")}
        </p>

        <p style={details}>
          <strong>Total Amount:</strong> ₹
          {bookingData.total}
        </p>

        <input
          style={input}
          placeholder="Card Holder Name"
          value={cardName}
          onChange={(e) =>
            setCardName(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="Card Number"
          maxLength="16"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) =>
            setExpiry(e.target.value)
          }
        />

        <input
          style={input}
          placeholder="CVV"
          maxLength="3"
          value={cvv}
          onChange={(e) =>
            setCvv(e.target.value)
          }
        />

        <button
          style={button}
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(to right, #0f172a, #1e293b, #334155)"
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "20px",
  width: "450px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

const title = {
  marginBottom: "20px",
  fontSize: "38px",
  color: "#0f172a"
};

const eventName = {
  marginBottom: "15px",
  color: "#475569"
};

const details = {
  marginBottom: "10px",
  color: "#475569",
  fontSize: "16px"
};

const input = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box"
};

const button = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};

export default Payment;