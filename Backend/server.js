const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// HOME

app.get("/", (req, res) => {
    res.json({
        message: "CAMPULSE API is running"
    });
});

// GET ALL EVENTS

app.get("/api/events", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    res.json(events);
});

// ADD EVENT
app.post("/api/events", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    const newEvent = {
        id: Date.now(),
        name: req.body.name,
        category: req.body.category,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
        description: req.body.description,
        registered: 0,
        capacity: Number(req.body.capacity)
    };

    events.push(newEvent);

    fs.writeFileSync(
        "./data/events.json",
        JSON.stringify(events, null, 2)
    );

    res.status(201).json({
        message: "Event created successfully",
        event: newEvent
    });
});


// DELETE EVENT

app.delete("/api/events/:id", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    const eventId = Number(req.params.id);

    const eventExists = events.some(
        (event) => event.id === eventId
    );

    if (!eventExists) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    const updatedEvents = events.filter(
        (event) => event.id !== eventId
    );

    fs.writeFileSync(
        "./data/events.json",
        JSON.stringify(updatedEvents, null, 2)
    );

    res.json({
        message: "Event deleted successfully"
    });
});

// ==============================
// UPDATE EVENT
// ==============================

app.put("/api/events/:id", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    const eventId = Number(req.params.id);

    const eventIndex = events.findIndex(
        (event) => event.id === eventId
    );

    if (eventIndex === -1) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    const existingEvent = events[eventIndex];

    const updatedEvent = {
        ...existingEvent,
        name: req.body.name,
        category: req.body.category,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
        description: req.body.description,
        capacity: Number(req.body.capacity)
    };

    if (updatedEvent.capacity < existingEvent.registered) {
        return res.status(400).json({
            message:
                "Capacity cannot be less than current registrations"
        });
    }

    events[eventIndex] = updatedEvent;

    fs.writeFileSync(
        "./data/events.json",
        JSON.stringify(events, null, 2)
    );

    res.json({
        message: "Event updated successfully",
        event: updatedEvent
    });
});


// REGISTER STUDENT

app.post("/api/registrations", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    const registrations = JSON.parse(
        fs.readFileSync("./data/registrations.json", "utf-8")
    );

    const { name, email, collegeYear, phone, eventId } = req.body;

    const event = events.find(
        (event) => event.id === Number(eventId)
    );

    // Check whether event exists
    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    // Check duplicate registration
    const alreadyRegistered = registrations.some(
        (registration) =>
            registration.email.toLowerCase() ===
                email.toLowerCase() &&
            registration.eventId === Number(eventId)
    );

    if (alreadyRegistered) {
        return res.status(400).json({
            message:
                "This email is already registered for this event"
        });
    }

    // Check event capacity
    if (event.registered >= event.capacity) {
        return res.status(400).json({
            message: "This event is full"
        });
    }

    // Create registration
    const registration = {
        id: Date.now(),
        name,
        email,
        collegeYear,
        phone,
        eventId: Number(eventId)
    };

    registrations.push(registration);

    // Increase registered count
    event.registered += 1;

    // Save registrations
    fs.writeFileSync(
        "./data/registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    // Save updated event
    fs.writeFileSync(
        "./data/events.json",
        JSON.stringify(events, null, 2)
    );

    res.status(201).json({
        message: "Registration successful",
        registration
    });
});





// GET ALL REGISTRATIONS


app.get("/api/registrations", (req, res) => {
    const registrations = JSON.parse(
        fs.readFileSync("./data/registrations.json", "utf-8")
    );

    res.json(registrations);
});


// ==============================
// LOGIN
// ==============================

app.post("/api/login", (req, res) => {
    const users = JSON.parse(
        fs.readFileSync("./data/users.json", "utf-8")
    );

    const { email, password } = req.body;

    const user = users.find(
        (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

// =========================
// STUDENT REGISTRATION
// =========================

app.post("/api/register", (req, res) => {
    const users = JSON.parse(
        fs.readFileSync("./data/users.json", "utf-8")
    );

    const {
        name,
        email,
        password,
        collegeYear
    } = req.body;

    // Check required fields
    if (
        !name ||
        !email ||
        !password ||
        !collegeYear
    ) {
        return res.status(400).json({
            message: "Please fill in all fields"
        });
    }

    // Check password length
    if (password.length < 6) {
        return res.status(400).json({
            message:
                "Password must be at least 6 characters"
        });
    }

    // Check if email already exists
    const existingUser = users.find(
        (user) =>
            user.email.toLowerCase() ===
            email.toLowerCase()
    );

    if (existingUser) {
        return res.status(400).json({
            message:
                "An account with this email already exists"
        });
    }

    // Create new student
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        collegeYear,
        role: "student"
    };

    users.push(newUser);

    fs.writeFileSync(
        "./data/users.json",
        JSON.stringify(users, null, 2)
    );

    res.status(201).json({
        message: "Student account created successfully"
    });
});

// ==============================
// LOGIN
// ==============================

app.post("/api/login", (req, res) => {
    const users = JSON.parse(
        fs.readFileSync("./data/users.json", "utf-8")
    );

    const { email, password } = req.body;

    const user = users.find(
        (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});
// START SERVER


app.listen(5000, () => {
    console.log(
        "Server running on http://localhost:5000"
    );
});