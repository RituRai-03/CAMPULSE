import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="events-page">

      <section className="events-header">
        <p className="eyebrow">CAMPUS EVENTS</p>

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

      <section className="event-controls">

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Workshop">Workshop</option>
          <option value="Competition">Competition</option>
          <option value="Cultural">Cultural</option>
        </select>

      </section>

      <section className="events-grid">

        {filteredEvents.map((event) => (
          <article className="event-card" key={event.id}>

            <div className="event-card-top">

              <span className="event-category">
                {event.category}
              </span>

              <span className="event-date">
                {event.date}
              </span>

            </div>

            <h2>{event.name}</h2>

            <p>{event.description}</p>

            <div className="event-details">
              <span>{event.time}</span>
              <span>{event.venue}</span>
            </div>

            <div className="event-bottom">

              <div>
                <strong>
                  {event.registered}/{event.capacity}
                </strong>

                <span> registered</span>
              </div>

              <button
                onClick={() => {
                  window.location.href = "/event";
                }}
              >
                Register →
              </button>

            </div>

          </article>
        ))}

      </section>

      {filteredEvents.length === 0 && (
        <div className="no-events">
          <h2>No events found.</h2>
          <p>Try another search or category.</p>
        </div>
      )}

    </main>
  );
}

export default Events;