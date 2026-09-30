const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(
  express.json()
);


// =====================================================
// DATA FILES
// =====================================================

const eventsFile = path.join(
  __dirname,
  "data",
  "events.json"
);

const registrationsFile = path.join(
  __dirname,
  "data",
  "registrations.json"
);

const usersFile = path.join(
  __dirname,
  "data",
  "users.json"
);


// =====================================================
// HELPER FUNCTIONS
// =====================================================

function readData(file) {

  try {

    if (!fs.existsSync(file)) {
      return [];
    }

    const data =
      fs.readFileSync(
        file,
        "utf8"
      );

    return data
      ? JSON.parse(data)
      : [];

  } catch (error) {

    console.error(
      "Error reading file:",
      file,
      error
    );

    return [];

  }

}


function writeData(file, data) {

  fs.writeFileSync(
    file,
    JSON.stringify(
      data,
      null,
      2
    )
  );

}


// =====================================================
// API HEALTH CHECK
// =====================================================

app.get(
  "/api",
  (req, res) => {

    res.json({
      message:
        "CAMPULSE API is running"
    });

  }
);


// =====================================================
// EVENTS
// =====================================================


// GET ALL EVENTS

app.get(
  "/api/events",
  (req, res) => {

    const events =
      readData(eventsFile);

    res.json(events);

  }
);


// ADD EVENT

app.post(
  "/api/events",
  (req, res) => {

    const events =
      readData(eventsFile);

    const {
      name,
      category,
      date,
      time,
      venue,
      description,
      capacity
    } = req.body;


    if (
      !name ||
      !category ||
      !date ||
      !time ||
      !venue ||
      !description ||
      !capacity
    ) {

      return res.status(400).json({
        message:
          "Please fill in all event fields"
      });

    }


    const newEvent = {

      id:
        events.length > 0
          ? Math.max(
              ...events.map(
                (event) =>
                  Number(event.id) || 0
              )
            ) + 1
          : 1,

      name,

      category,

      date,

      time,

      venue,

      description,

      capacity:
        Number(capacity),

      registered: 0

    };


    events.push(newEvent);

    writeData(
      eventsFile,
      events
    );


    res.status(201).json(
      newEvent
    );

  }
);


// UPDATE EVENT

app.put(
  "/api/events/:id",
  (req, res) => {

    const events =
      readData(eventsFile);

    const id =
      Number(req.params.id);

    const eventIndex =
      events.findIndex(
        (event) =>
          Number(event.id) === id
      );


    if (eventIndex === -1) {

      return res.status(404).json({
        message:
          "Event not found"
      });

    }


    const oldEvent =
      events[eventIndex];

    const {
      name,
      category,
      date,
      time,
      venue,
      description,
      capacity
    } = req.body;


    events[eventIndex] = {

      ...oldEvent,

      name:
        name || oldEvent.name,

      category:
        category || oldEvent.category,

      date:
        date || oldEvent.date,

      time:
        time || oldEvent.time,

      venue:
        venue || oldEvent.venue,

      description:
        description ||
        oldEvent.description,

      capacity:
        capacity !== undefined
          ? Number(capacity)
          : oldEvent.capacity

    };


    writeData(
      eventsFile,
      events
    );


    res.json(
      events[eventIndex]
    );

  }
);


// DELETE EVENT

app.delete(
  "/api/events/:id",
  (req, res) => {

    const events =
      readData(eventsFile);

    const id =
      Number(req.params.id);


    const eventExists =
      events.some(
        (event) =>
          Number(event.id) === id
      );


    if (!eventExists) {

      return res.status(404).json({
        message:
          "Event not found"
      });

    }


    const updatedEvents =
      events.filter(
        (event) =>
          Number(event.id) !== id
      );


    writeData(
      eventsFile,
      updatedEvents
    );


    res.json({
      message:
        "Event deleted successfully"
    });

  }
);


// =====================================================
// REGISTRATIONS
// =====================================================


// GET ALL REGISTRATIONS

app.get(
  "/api/registrations",
  (req, res) => {

    const registrations =
      readData(
        registrationsFile
      );

    res.json(
      registrations
    );

  }
);


// REGISTER FOR EVENT

app.post(
  "/api/registrations",
  (req, res) => {

    const registrations =
      readData(
        registrationsFile
      );

    const events =
      readData(eventsFile);


    const {
      name,
      email,
      collegeYear,
      phone,
      eventId
    } = req.body;


    if (
      !name ||
      !email ||
      !collegeYear ||
      !eventId
    ) {

      return res.status(400).json({
        message:
          "Please fill in all required fields"
      });

    }


    const numericEventId =
      Number(eventId);


    const event =
      events.find(
        (item) =>
          Number(item.id) ===
          numericEventId
      );


    if (!event) {

      return res.status(404).json({
        message:
          "Event not found"
      });

    }


    // CHECK CAPACITY

    if (
      Number(event.registered) >=
      Number(event.capacity)
    ) {

      return res.status(400).json({
        message:
          "This event is full."
      });

    }


    // PREVENT DUPLICATE REGISTRATION

    const alreadyRegistered =
      registrations.some(
        (registration) =>
          Number(
            registration.eventId
          ) === numericEventId &&
          registration.email
            ?.toLowerCase() ===
            email.toLowerCase()
      );


    if (alreadyRegistered) {

      return res.status(400).json({
        message:
          "You are already registered for this event."
      });

    }


    const newRegistration = {

      id:
        registrations.length > 0
          ? Math.max(
              ...registrations.map(
                (registration) =>
                  Number(
                    registration.id
                  ) || 0
              )
            ) + 1
          : 1,

      eventId:
        numericEventId,

      name,

      email,

      collegeYear,

      phone:
        phone || ""

    };


    registrations.push(
      newRegistration
    );


    // INCREASE EVENT COUNT

    event.registered =
      Number(event.registered || 0) +
      1;


    writeData(
      registrationsFile,
      registrations
    );

    writeData(
      eventsFile,
      events
    );


    res.status(201).json({
      message:
        "Registration successful",
      registration:
        newRegistration
    });

  }
);


// =====================================================
// STUDENT REGISTER
// =====================================================

app.post(
  "/api/register",
  (req, res) => {

    const users =
      readData(usersFile);

    const {
      name,
      email,
      password,
      collegeYear,
      phone
    } = req.body;


    if (
      !name ||
      !email ||
      !password ||
      !collegeYear
    ) {

      return res.status(400).json({
        message:
          "Please fill in all required fields"
      });

    }


    const existingUser =
      users.find(
        (user) =>
          user.email
            ?.toLowerCase() ===
          email.toLowerCase()
      );


    if (existingUser) {

      return res.status(400).json({
        message:
          "An account with this email already exists."
      });

    }


    const newUser = {

      id:
        users.length > 0
          ? Math.max(
              ...users.map(
                (user) =>
                  Number(user.id) || 0
              )
            ) + 1
          : 1,

      name,

      email,

      password,

      collegeYear,

      phone:
        phone || "",

      role:
        "student"

    };


    users.push(newUser);

    writeData(
      usersFile,
      users
    );


    res.status(201).json({
      message:
        "Account created successfully",
      user: {
        id:
          newUser.id,
        name:
          newUser.name,
        email:
          newUser.email,
        collegeYear:
          newUser.collegeYear,
        role:
          newUser.role
      }
    });

  }
);


// =====================================================
// LOGIN
// =====================================================

app.post(
  "/api/login",
  (req, res) => {

    const users =
      readData(usersFile);

    const {
      email,
      password
    } = req.body;


    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "Email and password are required"
      });

    }


    const user =
      users.find(
        (item) =>
          item.email
            ?.toLowerCase() ===
            email.toLowerCase() &&
          item.password ===
            password
      );


    if (!user) {

      return res.status(401).json({
        message:
          "Invalid email or password"
      });

    }


    res.json({

      message:
        "Login successful",

      user: {

        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        collegeYear:
          user.collegeYear,

        role:
          user.role

      }

    });

  }
);


// =====================================================
// SERVE REACT FRONTEND
// =====================================================

const frontendPath =
  path.join(
    __dirname,
    "..",
    "Frontend",
    "dist"
  );


app.use(
  express.static(
    frontendPath
  )
);


// =====================================================
// REACT ROUTING
// =====================================================

app.use(
  (req, res, next) => {

    // Never send API requests
    // to React

    if (
      req.path.startsWith(
        "/api/"
      )
    ) {

      return next();

    }


    // Send every frontend route
    // to React

    res.sendFile(
      path.join(
        frontendPath,
        "index.html"
      )
    );

  }
);


// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `CAMPULSE server running on port ${PORT}`
    );

  }
);