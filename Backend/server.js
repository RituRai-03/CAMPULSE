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



// REGISTER STUDENT


app.post("/api/registrations", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    const registrations = JSON.parse(
        fs.readFileSync("./data/registrations.json", "utf-8")
    );

    const {
        name,
        email,
        collegeYear,
        phone,
        eventId
    } = req.body;

    const event = events.find(
        (event) => event.id === Number(eventId)
    );

    // Check event
    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    // Check capacity
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

    // Save registration
    registrations.push(registration);

    // Increase registered count
    event.registered += 1;

    // Save registrations
    fs.writeFileSync(
        "./data/registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    // Save updated events
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



// START SERVER


app.listen(5000, () => {
    console.log(
        "Server running on http://localhost:5000"
    );
});