const express = require("express");
const config = require("config");
const path = require('path')
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

// connect routes // creating api
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

// handling builded frontend 
if (process.env.NODE_ENV === 'production') {
  // express static to point static front-end folder 'client'
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  // any get request
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index'))
  })
}

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
