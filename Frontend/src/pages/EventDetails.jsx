import { useEffect, useState } from "react";

const params = new URLSearchParams(
  window.location.search
);

const eventId = Number(
  params.get("id")
);

function EventDetails() {

  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================
  // CURRENT USER
  // =========================

  const user = JSON.parse(
    localStorage.getItem(
      "campulseUser"
    )
  );


  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] =
    useState({
      name: user?.name || "",
      email: user?.email || "",
      collegeYear:
        user?.collegeYear || "",
      phone: ""
    });


  // =========================
  // LOAD EVENT
  // =========================

  useEffect(() => {

    fetch("/api/events")
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to fetch event"
          );
        }

        return response.json();

      })
      .then((data) => {

        const selectedEvent =
          data.find(
            (item) =>
              item.id === eventId
          );

        setEvent(
          selectedEvent
        );

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
  // CHECK CAPACITY
  // =========================

  useEffect(() => {

    if (
      event &&
      event.registered >=
        event.capacity
    ) {

      setShowForm(false);

    }

  }, [event]);


  // =========================
  // REGISTER
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Prevent registration
    // when event is full

    if (
      event.registered >=
      event.capacity
    ) {

      setError(
        "This event is full. Registration is no longer available."
      );

      setShowForm(false);

      return;
    }


    setSubmitting(true);
    setError("");


    try {

      const response =
        await fetch(
          "/api/registrations",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              ...formData,
              eventId:
                event.id
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Registration failed"
        );

      }


      // Update local
      // registration count

      setEvent(
        (previousEvent) => ({
          ...previousEvent,

          registered:
            previousEvent.registered +
            1
        })
      );


      setSubmitted(true);

      setShowForm(false);


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

      <main
        className="event-details-page"
      >

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

      <main
        className="event-details-page"
      >

        <h2>
          Event not found.
        </h2>

      </main>

    );

  }


  // =========================
  // EVENT STATUS
  // =========================

  const isFull =
    event.registered >=
    event.capacity;


  return (

    <main
      className="event-details-page"
    >


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
          EVENT META
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
            {event.registered}/
            {event.capacity}
          </strong>

          <p>
            {isFull
              ? "event is full"
              : "students registered"}
          </p>

        </div>


      </section>


      {/* =========================
          REGISTRATION CTA
          ========================= */}

      {!showForm &&
        !submitted && (

          <section
            className="event-registration"
          >

            <div>

              <p className="section-label">
                REGISTRATION
              </p>


              <h2>
                {isFull
                  ? "This event is full."
                  : "Be part of it."}
              </h2>


              <p>
                {isFull
                  ? "All available seats have been reserved."
                  : "Secure your spot before the event reaches its capacity."}
              </p>

            </div>


            <button
              className="primary-btn"
              disabled={isFull}
              onClick={() => {

                // Extra safety check

                if (isFull) {
                  return;
                }


                // User must login

                if (!user) {

                  window.location.href =
                    "/login";

                  return;
                }


                // Only students
                // can register

                if (
                  user.role !==
                  "student"
                ) {

                  setError(
                    "Only student accounts can register for events."
                  );

                  return;
                }


                setError("");

                setShowForm(
                  true
                );

              }}
            >

              {isFull
                ? "Event Full"
                : "Register Now →"}

            </button>

          </section>

        )}


      {/* =========================
          CTA ERROR
          ========================= */}

      {!showForm &&
        !submitted &&
        error && (

          <p className="form-error">
            {error}
          </p>

        )}


      {/* =========================
          REGISTRATION FORM
          ========================= */}

      {showForm &&
        !submitted &&
        !isFull && (

          <section
            className="registration-section"
          >


            <div
              className="registration-heading"
            >

              <p className="section-label">
                JOIN THE EVENT
              </p>

              <h2>
                Reserve your spot.
              </h2>

            </div>


            <form
              className="registration-form"
              onSubmit={
                handleSubmit
              }
            >


              <label>

                Full Name

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={
                    formData.name
                  }
                  readOnly
                />

              </label>


              <label>

                Email

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={
                    formData.email
                  }
                  readOnly
                />

              </label>


              <label>

                College / Year

                <input
                  type="text"
                  placeholder="B.Tech 2nd Year"
                  value={
                    formData.collegeYear
                  }
                  readOnly
                />

              </label>


              <label>

                Phone Number

                <input
                  type="tel"
                  placeholder="9876543210"
                  value={
                    formData.phone
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone:
                        e.target.value
                    })
                  }
                  required
                />

              </label>


              {error && (

                <p className="form-error">
                  {error}
                </p>

              )}


              <button
                type="submit"
                className="primary-btn"
                disabled={
                  submitting
                }
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

        <section
          className="registration-success"
        >


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


          <div
            className="registration-ticket"
          >


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
              {event.date} ·{" "}
              {event.time}
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