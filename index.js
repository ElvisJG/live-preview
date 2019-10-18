const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const scraper = require("./scraper.js");

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(cors());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.json({
    message: "🌮 Hello from Live-Preview"
  });
});

app.get("/scrape", async (req, res) => {
  const { url } = req.query;

  try {
    const result = await scraper(url);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Ready to Rock"));
