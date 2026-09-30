const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CAMPULSE API is running"
    });
});

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

    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    if (event.registered >= event.capacity) {
        return res.status(400).json({
            message: "This event is full"
        });
    }

    const registration = {
        id: Date.now(),
        name,
        email,
        collegeYear,
        phone,
        eventId: Number(eventId)
    };

    registrations.push(registration);

    event.registered += 1;

    fs.writeFileSync(
        "./data/registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    fs.writeFileSync(
        "./data/events.json",
        JSON.stringify(events, null, 2)
    );

    res.status(201).json({
        message: "Registration successful",
        registration
    });
});

app.get("/api/events", (req, res) => {
    const events = JSON.parse(
        fs.readFileSync("./data/events.json", "utf-8")
    );

    res.json(events);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});