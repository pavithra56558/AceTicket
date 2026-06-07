import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Ticket() {
  const { id } = useParams();

  const bookings =
    JSON.parse(localStorage.getItem("myBookings")) || [];

  const ticket = bookings.find(
    (booking) => String(booking.id) === id
  );

  const downloadPDF = () => {
    const ticketElement =
      document.getElementById("ticket-card");

    html2canvas(ticketElement).then((canvas) => {
      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const imgWidth = pdfWidth - 20;

      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        imgWidth,
        imgHeight
      );

      pdf.save(
        `ticket-${ticket.id}.pdf`
      );
    });
  };

  const downloadImage = () => {
    const ticketElement =
      document.getElementById("ticket-card");

    html2canvas(ticketElement).then((canvas) => {
      const link =
        document.createElement("a");

      link.download =
        `ticket-${ticket.id}.png`;

      link.href =
        canvas.toDataURL("image/png");

      link.click();
    });
  };

  if (!ticket) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px"
        }}
      >
        Ticket Not Found
      </h1>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,#0f172a,#1e293b)"
      }}
    >
      {/* TICKET CARD */}
      <div
        id="ticket-card"
        style={{
          width: "600px",
          background: "white",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.3)"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background:
              "linear-gradient(to right,#2563eb,#7c3aed)",
            color: "white",
            padding: "25px",
            textAlign: "center"
          }}
        >
          <h1>🎟 EVENT TICKET</h1>
          <h2>{ticket.eventName}</h2>
        </div>

        {/* CONTENT */}
        <div
          style={{
            padding: "30px",
            textAlign: "center"
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            Booking ID: {ticket.id}
          </p>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px"
            }}
          >
            Scan the QR code to view full ticket details
          </p>

          {/* QR CODE */}
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px"
              }}
            >
              <QRCodeCanvas
                size={200}
                value={JSON.stringify({
                  bookingId: ticket.id,
                  event: ticket.eventName,
                  location: ticket.location,
                  seats: ticket.seats,
                  customer:
                    ticket.customerName,
                  amount: ticket.total
                })}
              />
            </div>
          </div>

          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: "#2563eb"
            }}
          >
            📱 Scan Ticket
          </p>
        </div>
      </div>

      {/* PDF BUTTON */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "25px",
          background:
            "linear-gradient(to right,#2563eb,#7c3aed)",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        📄 Download PDF
      </button>

      {/* PNG BUTTON */}
      <button
        onClick={downloadImage}
        style={{
          marginTop: "15px",
          background:
            "linear-gradient(to right,#16a34a,#22c55e)",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        🖼 Download PNG
      </button>
    </div>
  );
}

export default Ticket;