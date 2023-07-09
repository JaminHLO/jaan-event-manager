const db = require("./connection");
const { Club, Event } = require("../models");
const eventsData = require("./eventsData");
const clubsData = require("./clubsData");

db.once("open", async () => {
    await Club.insertMany(clubsData);
    console.log("clubs seeded")
    await Event.insertMany(eventsData);
    console.log("events seeded")

    process.exit();
})