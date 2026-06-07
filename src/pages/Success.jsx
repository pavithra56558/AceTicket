function Success() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background:
          "linear-gradient(to right,#0f172a,#1e293b,#334155)",
        color: "white"
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          marginBottom: "20px"
        }}
      >
        ✅ Payment Successful
      </h1>

      <p
        style={{
          fontSize: "22px"
        }}
      >
        Your ticket has been booked successfully.
      </p>
    </div>
  );
}

export default Success;