if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const passport = require("passport");
const flash = require("express-flash")
const session = require("express-session")


const initializePassport = require("./passport-config");
initializePassport(passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
const users = [];


app.listen(3000, function(){
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

app.post("/login", passport.authenticate("local", {
  successRedirect: "/portal",
  failureRedirect: "/login",
  failureFlash: true
}))

app.post("/register", async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect("/login")
  }
  catch {
    res.redirect("/register")
  }
  console.log(users);
})


// For User Log out

// app.delete("/logout", (req, res) => {
//   req.logOut()
//   req.redirect("/login")
// })
//
// function checkAuthenticated(req, res, next){
//   if (req.isAuthenticated()){
//     return next()
//   }
//   res.redirect("/")
// }
//
// function checkNotAuthenticated(req, res, next){
//   if (req.isAuthenticated()){
//     return res.redirect("/")
//   }
//   next()
//   }
