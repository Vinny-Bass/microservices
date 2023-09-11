import axios from "axios";
import express from "express";

const app = express()
app.use(express.json())

const events = []

app.post("/events", (req, res) => {
    const event = req.body

    events.push(event)

    axios.post("http://posts-cluster-ip-srv/events", event).catch(err => console.log(err.message)) //posts
    // axios.post("http://localhost:4001/events", event).catch(err => console.log(err.message)) //comments
    // axios.post("http://localhost:4002/events", event).catch(err => console.log(err.message)) //query
    // axios.post("http://localhost:4003/events", event).catch(err => console.log(err.message)) //moderation

    res.send({ status: "ok" })
})

// sync events when they are started or have been down, simple not production approach
app.get("/events", (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log("Listening in port 4005")
})