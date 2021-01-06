const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const helmet = require("helmet");
const cookieParser = require('cookie-parser')

// Logs Cache controlling Https

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser())

// const static_path = path.join(__dirname, '/public/images');
// console.log(__dirname, '/views/images');
app.use(express.static('public'));
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "hbs");

const authRoute = require('./routes/auth');
const clinicRoute = require('./routes/clinic');
const leaveRoute = require('./routes/leave');
const dashboardRoute = require('./routes/dashboard');

app.use("/", authRoute);
app.use("/", clinicRoute);
app.use("/", leaveRoute);
app.use("/", dashboardRoute);

const PORT = process.env.PORT || 3000;
const DBURL = "mongodb://localhost:27017/leaveapp"

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Application is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });  
