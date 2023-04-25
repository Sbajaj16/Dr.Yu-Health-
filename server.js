require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const passport = require("passport");
const flash = require("express-flash")
const session = require("express-session");
const mongoose = require("mongoose");

const initializePassport = require("./passport-config");
initializePassport(passport,
  async (email) => await User.findOne({ email: email }).exec(),
  async (id) => await User.findById(id).exec())

  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB Atlas:", error);
    });

  mongoose.connection.on('error', (error) => {
    console.error("MongoDB connection error:", error);
  });


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


const User = mongoose.model("User", userSchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server, Started");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.get("/login", (req, res) => {
  res.render("login.ejs");
})


app.get("/register", (req, res) => {
  res.render("register.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.get("/portal", (req, res) => {
  res.render("portal");
})

app.get("/chart", (req, res) => {
  res.render("chart");
})

app.get("/questions", (req, res) => {
  res.render("questions.ejs");
})


app.get("/Results", (req, res) => {
  res.render("Results.ejs");
})

app.post("/login", passport.authenticate("local", {
  successRedirect: "/portal",
  failureRedirect: "/login",
  failureFlash: true
}))

app.post("/register", async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    await newUser.save();
    res.redirect("/login");
  }
  catch {
    res.redirect("/register");
  }
})



// For User Log out

app.delete("/logout", (req, res) => {
  req.logOut()
  req.redirect("/login")
})

function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}

function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return res.redirect("/")
  }
  next()
  }

const surveySchema = new mongoose.Schema({
  stressLevel: { type: Number, required: true },
  mentalDisorder: { type: String },
  disorderEffect: { type: Number },
  eyePain: { type: Number },
  physicalActivity: { type: Number, required: true },
  activityDays: { type: String, required: true },
  activityDuration: { type: String, required: true },
  sittingHours: { type: Number, required: true },
  favoriteActivity: { type: String, required: true },
  wakeUpTime: { type: String, required: true },
  sleepHours: { type: Number, required: true },
  sleepTime: { type: String, required: true },
  sleepQuality: { type: Number, required: true },
  eyeDrynessMorning: { type: Number },
  hoursOutdoors: { type: Number, required: true },
  windyEyeDryness: { type: String, required: true },
  sunlightEyeDryness: { type: String, required: true },
  sunlightEyePain: { type: String, required: true },
  dailyWater: { type: Number, required: true },
  dailyProtein: { type: Number, required: true },
  dailyFruitsVegetables: { type: Number, required: true },
  dailyMeals: { type: Number, required: true },
  functionalFood: { type: [String], required: true },
  dailyFunctionalFood: { type: String, required: true },
  functionalFoodUsage: { type: String, required: true },
  regularFunctionalFood: { type: String, required: true },
  screenTime: { type: Number, required: true },
  readingTime: { type: Number, required: true },
  eyeStrainReading: { type: Number },
  homeLighting: { type: String, required: true },
  homeLightingStrain: { type: String, required: true },
  workplaceLighting: { type: String, required: true },
  workplaceLightingStrain: { type: String, required: true },
  bmi: { type: Number, required: true },
  lowEnergy: { type: String, required: true },
  energyLevel: { type: Number, required: true },
  dailyEyePain: { type: String, required: true },
  medicalConditions: { type: String },
  pastSurgicalProcedures: { type: String },
  currentMedications: { type: String },
  pregnant: { type: String, required: true },
  menstrualCycle: { type: String, required: true },
  menopause: { type: String }
});

const Survey = mongoose.model('Survey', surveySchema);



  app.post("/survey", async (req, res) => {
    const survey = new Survey(req.body);
    try {
      await survey.save();
      res.redirect("/portal");
    } catch (error) {
      console.log(error);
      res.redirect("/questions");
    }
  });
