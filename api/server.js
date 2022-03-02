const express = require("express"); // eslint-disable-line
const dotenv = require("dotenv"); // eslint-disable-line
const cors = require("cors"); // eslint-disable-line
const axios = require("axios"); //eslint-disable-line

const imageRouter = require("./image-router");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", imageRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});

const PORT = 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
