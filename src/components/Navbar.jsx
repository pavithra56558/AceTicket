import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  // CHECK LOGIN STATUS

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const isAdmin =
    localStorage.getItem("isAdmin") === "true";

  const navigate = useNavigate();

  // LOGOUT FUNCTION

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

    alert("Logged Out Successfully 👋");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav
      style={{
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
        color: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
      }}
    >
      {/* LOGO */}

      <h2
        style={{
          fontSize: "30px",
          fontWeight: "bold"
        }}
      >
        🎟 AceTicket
      </h2>

      {/* LINKS */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px"
        }}
      >
        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={linkStyle}
        >
          About
        </Link>

        <Link
          to="/events"
          style={linkStyle}
        >
          Events
        </Link>

        <Link
          to="/mytickets"
          style={linkStyle}
        >
          My Tickets
        </Link>

        <Link
          to="/validate-ticket"
          style={linkStyle}
        >
          Validate Ticket
        </Link>

        {/* ADMIN ONLY */}

        {isAdmin && (
          <Link
            to="/admin"
            style={{
              ...linkStyle,
              color: "#facc15",
              fontWeight: "bold"
            }}
          >
            Admin Dashboard
          </Link>
        )}

        <Link
          to="/contact"
          style={linkStyle}
        >
          Contact
        </Link>

        {/* LOGIN / LOGOUT */}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              ...linkStyle,
              background:
                "linear-gradient(to right, #2563eb, #7c3aed)",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "17px",
  fontWeight: "500"
};

export default Navbar;