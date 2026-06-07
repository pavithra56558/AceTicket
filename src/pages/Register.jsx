import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

  // NAVIGATION

  const navigate = useNavigate();

  // STATES

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // REGISTER FUNCTION

  const handleRegister = () => {

    if (!name || !email || !password) {

      alert("Please fill all fields");

      return;
    }

    // SAVE USER

    const userData = {
      name,
      email,
      password
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    alert("Registration Successful ✅");

    navigate("/login");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #111827, #1e3a8a, #312e81)",
        padding: "20px"
      }}
    >

      {/* REGISTER CARD */}

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}
      >

        {/* TITLE */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >

          <h1
            style={{
              fontSize: "40px",
              marginBottom: "10px",
              color: "#111827"
            }}
          >
            Create Account 🚀
          </h1>

          <p
            style={{
              color: "gray",
              fontSize: "16px"
            }}
          >
            Register to book your favorite events
          </p>

        </div>

        {/* NAME */}

        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(to right, #2563eb, #7c3aed)",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Register
        </button>

        {/* LOGIN LINK */}

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            fontSize: "16px"
          }}
        >
          Already have an account?
          {" "}

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

/* INPUT STYLE */

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box"
};

export default Register;