function Admin() {
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
          <strong>159</strong>
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
          <p className="section-label">EVENT MANAGEMENT</p>

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

      <section className="admin-actions">

        <div>
          <p className="section-label">REGISTRATIONS</p>

          <h2>View students.</h2>

          <p>
            Search and review students registered for
            upcoming campus events.
          </p>
        </div>

        <button className="primary-btn">
          View Registrations →
        </button>

      </section>

    </main>
  );
}

export default Admin;