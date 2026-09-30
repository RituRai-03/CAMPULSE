function Home() {
  return (
    <main className="home">

      {/* =========================
          HERO
          ========================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            CAMPUS EVENT PLATFORM
          </p>

          <h1>
            Your campus,
            <br />
            in motion.
          </h1>

          <p className="hero-text">
            Discover workshops, competitions, talks and
            experiences happening around your campus.
          </p>

          <div className="hero-actions">

            <button
              className="primary-btn"
              onClick={() => {
                window.location.href = "/events";
              }}
            >
              Explore Events →
            </button>

            <span className="hero-note">
              Discover. Register. Participate.
            </span>

          </div>

        </div>

        <div className="hero-index">
          <span>01</span>
          <span>CAMPULSE</span>
        </div>

      </section>


      {/* =========================
          INTRODUCTION
          ========================= */}

      <section className="home-intro">

        <div>
          <p className="section-label">
            THE IDEA
          </p>
        </div>

        <div className="home-intro-content">

          <h2>
            Everything happening
            <br />
            on campus. One place.
          </h2>

          <p>
            CAMPULSE brings college events into one
            simple platform. Students can discover what
            is happening, explore event details and
            reserve their spot without jumping between
            different groups and announcements.
          </p>

        </div>

      </section>


      {/* =========================
          FEATURED EVENT
          ========================= */}

      <section className="featured">

        <div className="home-section-heading">

          <div>
            <p className="section-label">
              FEATURED EVENT
            </p>

            <h2>
              Something worth joining.
            </h2>
          </div>

          <button
            className="text-link"
            onClick={() => {
              window.location.href = "/events";
            }}
          >
            View all events →
          </button>

        </div>


        <div className="featured-card">

          <div className="featured-main">

            <span className="event-category">
              TECHNICAL
            </span>

            <h3>
              Code After Dark
            </h3>

            <p>
              A competitive coding experience for students
              who love solving problems, building solutions
              and testing their skills.
            </p>

          </div>


          <div className="featured-info">

            <div>
              <span>DATE</span>
              <strong>02 OCT</strong>
            </div>

            <div>
              <span>TIME</span>
              <strong>6:00 PM</strong>
            </div>

            <div>
              <span>VENUE</span>
              <strong>Raman Block</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          PLATFORM FLOW
          ========================= */}

      <section className="home-flow">

        <div className="home-flow-heading">

          <p className="section-label">
            HOW IT WORKS
          </p>

          <h2>
            From discovery
            <br />
            to participation.
          </h2>

        </div>


        <div className="flow-list">

          <div className="flow-item">

            <span>01</span>

            <div>
              <h3>
                Discover
              </h3>

              <p>
                Browse upcoming campus events by
                category or search for something specific.
              </p>
            </div>

          </div>


          <div className="flow-item">

            <span>02</span>

            <div>
              <h3>
                Register
              </h3>

              <p>
                Choose an event and reserve your place
                with a simple registration.
              </p>
            </div>

          </div>


          <div className="flow-item">

            <span>03</span>

            <div>
              <h3>
                Participate
              </h3>

              <p>
                Keep track of your registrations and
                show up ready for the experience.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
          ========================= */}

      <section className="home-cta">

        <p className="section-label">
          READY?
        </p>

        <h2>
          Find something
          <br />
          happening.
        </h2>

        <button
          className="primary-btn"
          onClick={() => {
            window.location.href = "/events";
          }}
        >
          Explore Events →
        </button>

      </section>

    </main>
  );
}

export default Home;