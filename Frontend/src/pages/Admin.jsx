import { useEffect, useState } from "react";

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
      })
      .catch((error) => {
        console.error("Error fetching registrations:", error);
      });
  }, []);

  const filteredRegistrations = registrations.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.collegeYear.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="admin-page">

      <section className="admin-header">
        <p className="eyebrow">CAMPULSE ADMIN</p>

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

      <section className="admin-stats">

        <div className="admin-stat">
          <span>TOTAL EVENTS</span>
          <strong>4</strong>
          <p>Currently listed</p>
        </div>

        <div className="admin-stat">
          <span>REGISTRATIONS</span>
          <strong>{registrations.length}</strong>
          <p>Across all events</p>
        </div>

        <div className="admin-stat">
          <span>UPCOMING</span>
          <strong>4</strong>
          <p>Events scheduled</p>
        </div>

      </section>

      <section className="admin-actions">

        <div>
          <p className="section-label">
            EVENT MANAGEMENT
          </p>

          <h2>Manage events.</h2>

          <p>
            Add new events, update event details or remove
            events that are no longer active.
          </p>
        </div>

        <button className="primary-btn">
          Manage Events →
        </button>

      </section>

      <section className="admin-registrations">

        <div className="registration-list-header">

          <div>
            <p className="section-label">
              REGISTRATIONS
            </p>

            <h2>Registered students.</h2>
          </div>

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

            {filteredRegistrations.map((student) => (
              <div
                className="registration-row"
                key={student.id}
              >
                <strong>{student.name}</strong>

                <span>{student.email}</span>

                <span>{student.collegeYear}</span>

                <span>{student.phone}</span>

                <span>
                  Event #{student.eventId}
                </span>
              </div>
            ))}

          </div>
        ) : (
          <div className="no-registrations">
            <h3>No registrations found.</h3>

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