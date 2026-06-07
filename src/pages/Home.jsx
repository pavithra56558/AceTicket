import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {

  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

  const [newEvent, setNewEvent] = useState({
    eventName: "",
    location: "",
    price: "",
    eventDate: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  // FETCH EVENTS

  const fetchEvents = async () => {

    try {

      const response = await API.get("/events");

      setEvents(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // HANDLE INPUT

  const handleChange = (e) => {

    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  // ADD EVENT

  const addEvent = async () => {

    try {

      await API.post("/events", newEvent);

      fetchEvents();

      resetForm();

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE EVENT

  const deleteEvent = async (id) => {

    try {

      await API.delete(`/events/${id}`);

      fetchEvents();

    } catch (error) {

      console.log(error);

    }
  };

  // EDIT EVENT

  const editEvent = (event) => {

    setNewEvent({
      eventName: event.eventName,
      location: event.location,
      price: event.price,
      eventDate: event.eventDate,
    });

    setEditingId(event.id);
  };

  // UPDATE EVENT

  const updateEvent = async () => {

    try {

      await API.put(`/events/${editingId}`, newEvent);

      fetchEvents();

      resetForm();

    } catch (error) {

      console.log(error);

    }
  };

  // RESET FORM

  const resetForm = () => {

    setNewEvent({
      eventName: "",
      location: "",
      price: "",
      eventDate: "",
    });

    setEditingId(null);
  };

  // SEARCH FILTER

  const filteredEvents = events.filter((event) =>
    event.eventName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
          🎟 AceTicket Events
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "20px"
          }}
        >
          Manage and book live sports events
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* FORM */}

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          maxWidth: "1100px",
          marginInline: "auto"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          {editingId ? "Update Event" : "Add New Event"}
        </h2>

        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={newEvent.eventName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newEvent.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="eventDate"
          value={newEvent.eventDate}
          onChange={handleChange}
          style={inputStyle}
        />

        {editingId ? (

          <button
            onClick={updateEvent}
            style={buttonStyle}
          >
            Update Event
          </button>

        ) : (

          <button
            onClick={addEvent}
            style={buttonStyle}
          >
            Add Event
          </button>

        )}

      </div>

      {/* EVENT CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px"
        }}
      >

        {filteredEvents.map((event) => (

          <div
            key={event.id}
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
            }}
          >

            {/* TOP IMAGE */}

            <div
              style={{
                height: "180px",
                background:
                  "linear-gradient(to right, #2563eb, #7c3aed)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "70px",
                color: "white"
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

              <h2>{event.eventName}</h2>

              <p>
                <strong>📍 Location:</strong>
                {" "}
                {event.location}
              </p>

              <p>
                <strong>💰 Price:</strong>
                {" "}
                ₹{event.price}
              </p>

              <p>
                <strong>📅 Date:</strong>
                {" "}
                {event.eventDate}
              </p>

              <button style={buttonStyle}>
                Book Ticket
              </button>

              <button
                onClick={() => editEvent(event)}
                style={{
                  ...buttonStyle,
                  marginTop: "12px",
                  background:
                    "linear-gradient(to right, orange, #ff9800)"
                }}
              >
                Edit Event
              </button>

              <button
                onClick={() => deleteEvent(event.id)}
                style={{
                  ...buttonStyle,
                  marginTop: "12px",
                  background:
                    "linear-gradient(to right, #dc2626, #ef4444)"
                }}
              >
                Delete Event
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

// INPUT STYLE

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "16px"
};

// BUTTON STYLE

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  background:
    "linear-gradient(to right, #2563eb, #7c3aed)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Home;