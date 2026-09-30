import { useEffect, useState } from "react";

function MyRegistrations() {

  const [registrations, setRegistrations] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // CURRENT USER
  // =========================

  const user = JSON.parse(
    localStorage.getItem(
      "campulseUser"
    )
  );


  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          registrationsResponse,
          eventsResponse
        ] = await Promise.all([

          fetch(
            "/api/registrations"
          ),

          fetch(
            "/api/events"
          )

        ]);


        if (
          !registrationsResponse.ok ||
          !eventsResponse.ok
        ) {

          throw new Error(
            "Failed to load data"
          );

        }


        const registrationsData =
          await registrationsResponse.json();

        const eventsData =
          await eventsResponse.json();


        setRegistrations(
          registrationsData
        );

        setEvents(
          eventsData
        );


      } catch (error) {

        console.error(
          "Error loading registrations:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadData();

  }, []);


  // =========================
  // USER REGISTRATIONS
  // =========================

  const myRegistrations =
    registrations.filter(
      (registration) =>
        registration.email
          ?.toLowerCase() ===
        user?.email
          ?.toLowerCase()
    );


  // =========================
  // FIND EVENT
  // =========================

  const getEvent = (eventId) => {

    return events.find(
      (event) =>
        event.id === eventId
    );

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <main
        className="my-registrations-page"
      >

        <p>
          Loading your registrations...
        </p>

      </main>

    );

  }


  return (

    <main
      className="my-registrations-page"
    >


      {/* =========================
          HEADER
          ========================= */}

      <section
        className="my-registrations-header"
      >

        <p className="eyebrow">
          STUDENT ACCOUNT
        </p>


        <h1>
          Your
          <br />
          registrations.
        </h1>


        <p>
          Keep track of the events you've
          joined across your campus.
        </p>

      </section>


      {/* =========================
          EMPTY STATE
          ========================= */}

      {myRegistrations.length === 0 ? (

        <section
          className="empty-registrations"
        >

          <p className="section-label">
            NO REGISTRATIONS YET
          </p>


          <h2>
            Nothing here yet.
          </h2>


          <p>
            Explore upcoming events and
            reserve your spot when you
            find something interesting.
          </p>


          <button
            className="primary-btn"
            onClick={() => {

              window.location.href =
                "/events";

            }}
          >
            Explore Events →
          </button>

        </section>

      ) : (


        /* =========================
           REGISTRATION LIST
           ========================= */

        <section
          className="my-registration-list"
        >

          {myRegistrations.map(
            (registration) => {

              const event =
                getEvent(
                  registration.eventId
                );


              if (!event) {
                return null;
              }


              return (

                <article
                  className="my-registration-card"
                  key={registration.id}
                >


                  {/* =========================
                      EVENT INFORMATION
                      ========================= */}

                  <div
                    className="my-registration-main"
                  >

                    <span
                      className="event-category"
                    >
                      {event.category}
                    </span>


                    <h2>
                      {event.name}
                    </h2>


                    <p>
                      {event.description}
                    </p>

                  </div>


                  {/* =========================
                      EVENT DETAILS
                      ========================= */}

                  <div
                    className="my-registration-details"
                  >


                    <div>

                      <span>
                        DATE
                      </span>

                      <strong>
                        {event.date}
                      </strong>

                    </div>


                    <div>

                      <span>
                        TIME
                      </span>

                      <strong>
                        {event.time}
                      </strong>

                    </div>


                    <div>

                      <span>
                        VENUE
                      </span>

                      <strong>
                        {event.venue}
                      </strong>

                    </div>


                    <div
                      className="registration-status"
                    >

                      <span>
                        STATUS
                      </span>

                      <strong>
                        ✓ REGISTERED
                      </strong>

                    </div>


                  </div>


                </article>

              );

            }
          )}

        </section>

      )}


    </main>

  );

}

export default MyRegistrations;