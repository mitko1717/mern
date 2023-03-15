const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

// connect routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
// app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));

    app.listen(PORT, () =>
      console.log(`app has been started on port: ${PORT}`)
    );
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
}

start();
