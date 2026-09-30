import { useEffect, useState } from "react";

const params = new URLSearchParams(window.location.search);
const eventId = Number(params.get("id"));

function EventDetails() {

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get logged-in user
  const user = JSON.parse(
    localStorage.getItem("campulseUser")
  );

  // Registration form
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    collegeYear: user?.collegeYear || "",
    phone: ""
  });


  // =========================
  // FETCH EVENT
  // =========================

  useEffect(() => {

    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {

        const selectedEvent = data.find(
          (item) => item.id === eventId
        );

        setEvent(selectedEvent);
        setLoading(false);

      })
      .catch((error) => {

        console.error(
          "Error fetching event:",
          error
        );

        setLoading(false);

      });

  }, []);


  // =========================
  // SUBMIT REGISTRATION
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            ...formData,
            eventId: event.id
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Registration failed"
        );
      }

      setSubmitted(true);

    } catch (error) {

      console.error(error);

      setError(
        error.message ||
        "Unable to register. Please try again."
      );

    } finally {

      setSubmitting(false);

    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <main className="event-details-page">

        <p>
          Loading event...
        </p>

      </main>
    );

  }


  // =========================
  // EVENT NOT FOUND
  // =========================

  if (!event) {

    return (
      <main className="event-details-page">

        <h2>
          Event not found.
        </h2>

      </main>
    );

  }


  return (

    <main className="event-details-page">


      {/* =========================
          EVENT HERO
      ========================= */}

      <section className="event-hero">

        <div>

          <span className="event-category">
            {event.category}
          </span>

          <h1>
            {event.name}
          </h1>

          <p>
            {event.description}
          </p>

        </div>


        <div className="event-date-large">

          <span>
            {event.date.split(" ")[0]}
          </span>

          <small>
            {event.date
              .split(" ")[1]
              ?.substring(0, 3)
              .toUpperCase()}
          </small>

        </div>

      </section>


      {/* =========================
          EVENT INFORMATION
      ========================= */}

      <section className="event-meta">

        <div>

          <span>
            DATE & TIME
          </span>

          <strong>
            {event.date}
          </strong>

          <p>
            {event.time}
          </p>

        </div>


        <div>

          <span>
            VENUE
          </span>

          <strong>
            {event.venue}
          </strong>

        </div>


        <div>

          <span>
            CAPACITY
          </span>

          <strong>
            {event.registered}/{event.capacity}
          </strong>

          <p>
            students registered
          </p>

        </div>

      </section>


      {/* =========================
          REGISTRATION CTA
      ========================= */}

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
  Secure your spot before the event reaches
  its capacity.
</p>

          </div>


   <button
  className="primary-btn"
  onClick={() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (user.role !== "student") {
      setError("Only student accounts can register for events.");
      return;
    }

    setShowForm(true);
  }}
>
  Register Now →
</button>
        </section>

      )}


      {/* =========================
          REGISTRATION FORM
      ========================= */}

      {showForm && !submitted && (

        <section className="registration-section">

          <div className="registration-heading">

            <p className="section-label">
              JOIN THE EVENT
            </p>

            <h2>
              Reserve your spot.
            </h2>

          </div>


          <form
            className="registration-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <label>

              Full Name

              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                readOnly
              />

            </label>


            {/* EMAIL */}

            <label>

              Email

              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                readOnly
              />

            </label>


            {/* COLLEGE / YEAR */}

            <label>

              College / Year

              <input
                type="text"
                placeholder="B.Tech 2nd Year"
                value={formData.collegeYear}
                readOnly
              />

            </label>


            {/* PHONE */}

            <label>

              Phone Number

              <input
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value
                  })
                }
                required
              />

            </label>


            {/* ERROR */}

            {error && (

              <p className="form-error">
                {error}
              </p>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="primary-btn"
              disabled={submitting}
            >

              {submitting
                ? "Registering..."
                : "Confirm Registration →"}

            </button>

          </form>

        </section>

      )}


      {/* =========================
          SUCCESS
      ========================= */}

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
            Your spot for{" "}
            <strong>
              {event.name}
            </strong>{" "}
            has been reserved.
          </p>


          <div className="registration-ticket">

            <span>
              EVENT
            </span>

            <strong>
              {event.name}
            </strong>


            <span>
              DATE
            </span>

            <strong>
              {event.date} · {event.time}
            </strong>


            <span>
              VENUE
            </span>

            <strong>
              {event.venue}
            </strong>

          </div>

        </section>

      )}

    </main>

  );
}

export default EventDetails;