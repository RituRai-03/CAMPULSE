function Home() {
  return (
    <main className="home">

      <section className="hero">
        <p className="eyebrow">CAMPUS EVENT PLATFORM</p>

        <h1>
          Your campus,
          <br />
          in motion.
        </h1>

        <p className="hero-text">
          Discover workshops, competitions, talks and
          experiences happening around your campus.
        </p>

        <button className="primary-btn">
          Explore Events
        </button>
      </section>

      <section className="featured">
        <p className="section-label">FEATURED EVENT</p>

        <div className="featured-card">
          <div>
            <span className="event-category">TECHNICAL</span>

            <h2>Code After Dark</h2>

            <p>
              A competitive coding experience for students
              who love solving problems.
            </p>
          </div>

          <div className="event-info">
            <strong>02 OCT</strong>
            <span>6:00 PM</span>
            <span>Innovation Lab</span>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;