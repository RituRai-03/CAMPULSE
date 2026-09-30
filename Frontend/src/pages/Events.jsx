import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching events:",
          error
        );

        setError(
          "Unable to load events. Please make sure the CAMPULSE server is running."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="events-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="events-header">

        <p className="eyebrow">
          CAMPUS EVENTS
        </p>

        <h1>
          Find your
          <br />
          next thing.
        </h1>

        <p>
          Explore events, workshops and experiences
          happening around your campus.
        </p>

      </section>


      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <section className="event-controls">

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

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

      </section>


      {/* =========================
          EVENTS
      ========================= */}

      <section className="events-grid">

        {/* LOADING */}

        {loading ? (

          <div className="events-loading">

            <p className="section-label">
              LOADING EVENTS
            </p>

            <h2>
              Loading upcoming events...
            </h2>

          </div>

        ) : error ? (

          /* ERROR */

          <div className="events-loading">

            <p className="section-label">
              CONNECTION ERROR
            </p>

            <h2>
              {error}
            </h2>

            <button
              className="primary-btn"
              onClick={() => {
                window.location.reload();
              }}
              style={{
                marginTop: "25px"
              }}
            >
              Try Again →
            </button>

          </div>

        ) : filteredEvents.length > 0 ? (

          /* EVENTS */

          filteredEvents.map((event) => (

            <article
              className="event-card"
              key={event.id}
            >

              <div className="event-card-top">

                <span className="event-category">
                  {event.category}
                </span>

                <span className="event-date">
                  {event.date}
                </span>

              </div>


              <h2>
                {event.name}
              </h2>


              <p>
                {event.description}
              </p>


              <div className="event-details">

                <span>
                  {event.time}
                </span>

                <span>
                  {event.venue}
                </span>

              </div>


              <div className="event-bottom">

                <div>

                  <strong>
                    {event.registered}/{event.capacity}
                  </strong>

                  <span>
                    {" "}
                    {event.registered >= event.capacity 
                    ? "Event full"
                    : "registered"}
                  </span>

                </div>


<button
  disabled={event.registered >= event.capacity}
  onClick={() => {
    window.location.href =
      `/event?id=${event.id}`;
  }}
>
  {event.registered >= event.capacity
    ? "Event Full"
    : "Register →"}
</button>

              </div>

            </article>

          ))

        ) : (

          /* NO RESULTS */

          <div className="events-loading">

            <p className="section-label">
              NO EVENTS FOUND
            </p>

            <h2>
              Nothing matches your search.
            </h2>

          </div>

        )}

      </section>

    </main>
  );
}

export default Events;