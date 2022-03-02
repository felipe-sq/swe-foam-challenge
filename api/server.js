const express = require("express");
const cors = require("cors");

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
