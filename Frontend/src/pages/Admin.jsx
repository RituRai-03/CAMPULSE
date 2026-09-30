import { useEffect, useState } from "react";

function Admin() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [showEventForm, setShowEventForm] = useState(false);

  const [eventForm, setEventForm] = useState({
    name: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "Raman Block",
    description: "",
    capacity: ""
  });

  const [search, setSearch] = useState("");

  // =========================
  // LOAD DATA
  // =========================

  const loadEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const loadRegistrations = () => {
    fetch("http://localhost:5000/api/registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
      });
  };

  useEffect(() => {
    loadEvents();
    loadRegistrations();
  }, []);

  // =========================
  // ADD EVENT
  // =========================

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventForm)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      setEventForm({
        name: "",
        category: "Technical",
        date: "",
        time: "",
        venue: "Raman Block",
        description: "",
        capacity: ""
      });

      setShowEventForm(false);

      loadEvents();
    } catch (error) {
      console.error(error);
      alert("Unable to create event.");
    }
  };

  // =========================
  // DELETE EVENT
  // =========================

  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      loadEvents();
    } catch (error) {
      console.error(error);
      alert("Unable to delete event.");
    }
  };

  // =========================
  // SEARCH REGISTRATIONS
  // =========================

  const filteredRegistrations = registrations.filter(
    (student) => {
      const searchText = search.toLowerCase();

      return (
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.collegeYear
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <main className="admin-page">

      {/* HEADER */}

      <section className="admin-header">

        <p className="eyebrow">
          CAMPULSE ADMIN
        </p>

        <h1>
          Manage your
          <br />
          campus.
        </h1>

        <p>
          Create events, manage registrations and keep
          campus activities organized.
        </p>

      </section>


      {/* STATS */}

      <section className="admin-stats">

        <div className="admin-stat">

          <span>
            TOTAL EVENTS
          </span>

          <strong>
            {events.length}
          </strong>

          <p>
            Currently listed
          </p>

        </div>


        <div className="admin-stat">

          <span>
            REGISTRATIONS
          </span>

          <strong>
            {registrations.length}
          </strong>

          <p>
            Across all events
          </p>

        </div>


        <div className="admin-stat">

          <span>
            UPCOMING
          </span>

          <strong>
            {events.length}
          </strong>

          <p>
            Events scheduled
          </p>

        </div>

      </section>


      {/* EVENT MANAGEMENT */}

      <section className="admin-event-management">

        <div className="admin-section-heading">

          <div>

            <p className="section-label">
              EVENT MANAGEMENT
            </p>

            <h2>
              Manage events.
            </h2>

          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setShowEventForm(!showEventForm)
            }
          >
            {showEventForm
              ? "Close Form"
              : "+ Add Event"}
          </button>

        </div>


        {/* ADD EVENT FORM */}

        {showEventForm && (

          <form
            className="event-form"
            onSubmit={handleEventSubmit}
          >

            <label>
              Event Name

              <input
                type="text"
                placeholder="Hackathon 2026"
                value={eventForm.name}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    name: e.target.value
                  })
                }
                required
              />

            </label>


            <label>
              Category

              <select
                value={eventForm.category}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    category: e.target.value
                  })
                }
              >

                <option value="Technical">
                  Technical
                </option>

                <option value="Workshop">
                  Workshop
                </option>

                <option value="Competition">
                  Competition
                </option>

                <option value="Cultural">
                  Cultural
                </option>

              </select>

            </label>


            <label>
              Date

              <input
                type="text"
                placeholder="20 October 2026"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    date: e.target.value
                  })
                }
                required
              />

            </label>


            <label>
              Time

              <input
                type="text"
                placeholder="10:00 AM – 1:00 PM"
                value={eventForm.time}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    time: e.target.value
                  })
                }
                required
              />

            </label>


            <label>
              Venue

              <select
                value={eventForm.venue}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    venue: e.target.value
                  })
                }
              >

                <option value="Raman Block">
                  Raman Block
                </option>

                <option value="Vishwakarma Block">
                  Vishwakarma Block
                </option>

              </select>

            </label>


            <label>
              Capacity

              <input
                type="number"
                placeholder="60"
                min="1"
                value={eventForm.capacity}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    capacity: e.target.value
                  })
                }
                required
              />

            </label>


            <label className="event-form-full">
              Description

              <textarea
                placeholder="Describe the event..."
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    description: e.target.value
                  })
                }
                required
              />

            </label>


            <button
              type="submit"
              className="primary-btn"
            >
              Create Event →
            </button>

          </form>

        )}


        {/* EVENT LIST */}

        <div className="admin-event-list">

          {events.map((event) => (

            <article
              className="admin-event-row"
              key={event.id}
            >

              <div>

                <span className="event-category">
                  {event.category}
                </span>

                <h3>
                  {event.name}
                </h3>

                <p>
                  {event.date} · {event.time}
                </p>

              </div>


              <div className="admin-event-info">

                <span>
                  {event.venue}
                </span>

                <strong>
                  {event.registered}/{event.capacity}
                </strong>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteEvent(event.id)
                  }
                >
                  Delete
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* REGISTRATIONS */}

      <section className="admin-registrations">

        <div className="registration-list-header">

          <div>

            <p className="section-label">
              REGISTRATIONS
            </p>

            <h2>
              Registered students.
            </h2>

          </div>


          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {filteredRegistrations.length > 0 ? (

          <div className="registration-table">

            <div className="registration-table-header">

              <span>NAME</span>
              <span>EMAIL</span>
              <span>COLLEGE / YEAR</span>
              <span>PHONE</span>
              <span>EVENT</span>

            </div>


            {filteredRegistrations.map(
              (student) => (

                <div
                  className="registration-row"
                  key={student.id}
                >

                  <strong>
                    {student.name}
                  </strong>

                  <span>
                    {student.email}
                  </span>

                  <span>
                    {student.collegeYear}
                  </span>

                  <span>
                    {student.phone}
                  </span>

                  <span>
                    Event #{student.eventId}
                  </span>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="no-registrations">

            <h3>
              No registrations found.
            </h3>

            <p>
              {search
                ? "Try another search."
                : "Students who register for events will appear here."}
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Admin;