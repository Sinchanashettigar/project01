const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const connectDb = require("../backend/config/database");
const manufactureRoutes = require("./routers/manufactureRoutes");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDb();

app.use("/api/patient", require("./routers/patientRoutes"));


app.use("/api/manufacture", require("./routers/manufactureRoutes"));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
