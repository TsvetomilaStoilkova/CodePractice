import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bookRouter from "./routes/BookRouter.js";
import eventRouter from "./routes/EventRouter.js";
import EventStore from "./repositories/EventStore.js";
import bookstoreRouter from "./routes/BookstoreRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

const dbURI =
  "mongodb+srv://Tsvety:TxiyuX5Jq0CESdHq@inventory.uttl8dl.mongodb.net/stock?retryWrites=true&w=majority&appName=Inventory";
mongoose
  .connect(dbURI)
  .then(() => app.listen(5002))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to my Inventory Management API");
});

app.get("/getData", async (req, res) => {
  try {
    res.json({ message: "Data fetched successfully" });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await EventStore.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});

app.use("/api/books", bookRouter);
app.use("/api/events", eventRouter);
app.use("/api/bookstores", bookstoreRouter);
