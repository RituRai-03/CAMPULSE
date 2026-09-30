import { useState } from "react";

const event = {
  id: 1,
  name: "Code After Dark",
  category: "Technical",
  date: "02 October 2026",
  time: "6:00 PM – 9:00 PM",
  venue: "Innovation Lab",
  description:
    "A competitive coding experience designed for students who enjoy solving problems, thinking under pressure and building solutions.",
  registered: 42,
  capacity: 60,
  teamSize: "1–2 members",
  certificate: "Yes",
  registrationDeadline: "01 October 2026"
};

function EventDetails() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="event-details-page">

      <section className="event-hero">

        <div>
          <span className="event-category">
            {event.category}
          </span>

          <h1>{event.name}</h1>

          <p>
            {event.description}
          </p>
        </div>

        <div className="event-date-large">
          <span>02</span>
          <small>OCT</small>
        </div>

      </section>

      <section className="event-meta">

        <div>
          <span>DATE & TIME</span>
          <strong>{event.date}</strong>
          <p>{event.time}</p>
        </div>

        <div>
          <span>VENUE</span>
          <strong>{event.venue}</strong>
        </div>

        <div>
          <span>CAPACITY</span>
          <strong>
            {event.registered}/{event.capacity}
          </strong>
          <p>students registered</p>
        </div>

      </section>

      {!showForm && !submitted && (
        <section className="event-registration">

          <div>
            <p className="section-label">
              REGISTRATION
            </p>

            <h2>
              Be part of it.
            </h2>

            <p>
              Registration closes on{" "}
              <strong>{event.registrationDeadline}</strong>.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Register Now →
          </button>

        </section>
      )}

      {showForm && !submitted && (
        <section className="registration-section">

          <div className="registration-heading">
            <p className="section-label">
              JOIN THE EVENT
            </p>

            <h2>Reserve your spot.</h2>
          </div>

          <form
            className="registration-form"
            onSubmit={handleSubmit}
          >

            <label>
              Full Name

              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Email

              <input
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              College / Year

              <input
                type="text"
                placeholder="B.Tech 2nd Year"
                required
              />
            </label>

            <label>
              Phone Number

              <input
                type="tel"
                placeholder="9876543210"
                required
              />
            </label>

            <button
              type="submit"
              className="primary-btn"
            >
              Confirm Registration →
            </button>

          </form>

        </section>
      )}

      {submitted && (
        <section className="registration-success">

          <div className="success-icon">
            ✓
          </div>

          <p className="section-label">
            REGISTRATION CONFIRMED
          </p>

          <h2>
            You're officially in.
          </h2>

          <p>
            Your spot for <strong>{event.name}</strong> has
            been reserved.
          </p>

          <div className="registration-ticket">
            <span>EVENT</span>
            <strong>{event.name}</strong>

            <span>DATE</span>
            <strong>{event.date} · {event.time}</strong>

            <span>VENUE</span>
            <strong>{event.venue}</strong>
          </div>

        </section>
      )}

    </main>
  );
}

export default EventDetails;