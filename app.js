const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const path = require('path');
const startMongoServer = require('./lib/config/db');
const apiV1Routes = require('./lib/routes/v1')

dotenv.config();
startMongoServer();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,  "client", "build")))

app.use('/api/v1', apiV1Routes);

app.get("/api", (req, res) => {
  res.json({ message: "API Working" });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});