const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

function initialize(passport, getUserByEmail, getUserById) {

  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    if (user == null){
      return done(null, false, {message: "No user with that email" })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else{
        return done(null, false, {message: "Password is incorrect"})
      }
    } catch (e) {
      done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: "email"}, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  })

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error: " + err);
  });
}

module.exports = initialize;
