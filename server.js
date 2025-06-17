import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import IPO from "./models/Iposchema.js";
import Adminlogin from "./models/Adminlogin.js";
import { sendEmail } from "./src/routes/Mail.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config()
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express()
const port = 3000
const salt = bcrypt.genSaltSync(10);
app.use(cors())
app.use(express.json())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://ipo-hel9.onrender.com/auth/google/callback",
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      
      // ✅ Check if email exists in your admin database
      const existingAdmin = await Adminlogin.findOne({ email: email });

      if (!existingAdmin) {
        // ❌ Not authorized
        return done(null, false, { message: "Unauthorized email" });
      }

      // ✅ Authorized
      return done(null, profile);
    } catch (err) {
      console.error("Error in Google Strategy:", err);
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done)=>done(null,user));
passport.deserializeUser((user, done)=>done(null,user));

mongoose.connect("mongodb+srv://vashista:vashista143@bluestock-ipo.r0iii1m.mongodb.net/ipodata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(console.log("mongodb connected"))
app.get("/",(req,res)=>{
  res.send("hello backend")
})
app.get('/api', async (req, res) => {
  try{
    const ipos= await IPO.find()
    console.log(ipos)
    res.json(ipos)
  }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Server error" });
  }
})
app.get("/auth/google",passport.authenticate('google', {scope:["profile","email"]}))

app.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/unauthorized",
}), (req, res) => {
  const user = req.user;
  const frontendUrl = `https://ipo-theta.vercel.app/loginsuccess?name=${encodeURIComponent(user.displayName)}&email=${encodeURIComponent(user.emails[0].value)}`;
  console.log("signed in with Google");
  res.redirect(frontendUrl);
});

app.get("/unauthorized", (req, res) => {
  const frontendUrl = "https://ipo-theta.vercel.app/access-denied";
  res.redirect(frontendUrl);
});

app.get("/profile",(req,res)=>{
    res.send(`welcome ${req.user.displayName}`)
})
app.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})

app.post("/loginadmin",async (req,res)=>{
  try{
  const {email, password, token} =req.body 
  const secretKey = "6LcQFlorAAAAAKYXYpnQzTahWyIZliCyAjGDLxMm"; 
  const params = new URLSearchParams();
  params.append("secret", secretKey);
  params.append("response", token);
  const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  const captchaJson = await captchaRes.json();

  if (!captchaJson.success) {
    return res.status(400).json({ message: "Captcha validation failed" });
  }
    console.log(email, password)
    const log = await Adminlogin.findOne({ email: email});
    if (!log) {
    return res.status(404).json({ error: "user not found" });
    }
    const loginadmin=bcrypt.compareSync(password, log.password);
    if(!loginadmin){
      return res.status(404).json({ error: "wrong password" });
    }
    res.json({ message: "user logged successfully", loginadmin: log });
  }catch(error){
    res.status(500).json({error: "server not responding"})
    console.log(error)
  }
})

app.post("/signupadmin",async (req,res)=>{
  try{
  console.log("signup hit")
  const {name, email, password, token} =req.body 
  const secretKey = "6LcfJlwrAAAAAIX0_RrFqZCG7Zsk_CUPdTeKC-Km"; 
  const params = new URLSearchParams();
  params.append("secret", secretKey);
  params.append("response", token);
  const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

const captchaJson = await captchaRes.json();

  if (!captchaJson.success) {
    return res.status(400).json({ message: "Captcha validation failed" });
  }
  console.log(name, email, password)
  const exist = await Adminlogin.findOne({email:email})
  if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hash = bcrypt.hashSync(password, salt);
    const signupadmin = await Adminlogin.create({name:name, email: email, password: hash });
    if (!signupadmin) {
      return res.status(404).json({ error: "user not created" });
    }
    res.json({ message: "user created successfully", signupadmin });
  }catch(error){
    res.status(500).json({error: "server not responding"})
    console.log(error)
  }
})

const verifyRecaptcha = async (token) => {
  const secret ="6LcTDlsrAAAAAFKu9M9Sqh73oE9umw4eSMoMMOV_";
  const url = `https://www.google.com/recaptcha/api/siteverify`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await res.json();
  return data.success && data.score >= 0.5;
};

app.post("/reset", async (req, res) => {
    console.log(req.body.mailid);
    const { mailid, captchaToken } = req.body;
    const email = req.body.mailid;
     if (!await verifyRecaptcha(captchaToken)) {
    return res.status(403).json({ success: false, message: "Failed reCAPTCHA verification" });
  }
    else if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    try {
        const admin = await Adminlogin.findOne({ email: email });
        console.log(admin)
        if (!admin) {
            return res.status(404).json({ success: false, message: "Email not found" });
        }
        
        const resetLink = `https://ipo-theta.vercel.app/reset-password/${admin._id}`;
        await sendEmail(email, "Reset Password", `Click on the link to reset your password: ${resetLink}`);
        return res.status(200).json({ success: true, message: "Reset password link sent successfully" });

    } catch (error) {
        console.error("Error during password reset:", error);
        return res.status(500).json({ success: false, message: "Failed to send reset email" });
    }
});

app.post("/reset-password/:id",async (req,res)=>{
  try{const {password, id}=req.body;
  console.log(password, id)
  const hash = bcrypt.hashSync(password, 10);
  const user = await Adminlogin.findByIdAndUpdate(id,{
    $set: {password : hash}
  },{ new: true } )
   if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
  })


app.get("/ipoupdate/:id",async (req,res)=>{
  try{
    const {id} =req.params
    const updateipo= await IPO.findById(id  )
    res.json(updateipo)
    console.log(updateipo)
  }catch(error){
    res.status(500).json({error: "server not responding"})
    console.log(error)
  }
})

app.post("/ipoupdate/:id",async (req,res)=>{
  try{
    const {id} =req.params
    const updateformdata = req.body
    console.log(updateformdata)
    const updatedIPO = await IPO.findByIdAndUpdate(id, updateformdata, {new: true,runValidators: true,})
    if (!updatedIPO) {
      return res.status(404).json({ error: "IPO not found" });
    }
    res.json({ message: "IPO updated successfully", updatedIPO });
  }catch(error){
    res.status(500).json({error: "server not responding"})
    console.log(error)
  }
})

app.post("/registeripo",async (req,res)=>{
  try{
    const registerformdata = req.body
    console.log(registerformdata)
    const registerIPO = await IPO.create(registerformdata)
    if (!registerIPO) {
      return res.status(404).json({ error: "IPO not found" });
    }
    res.json({ message: "IPO updated successfully", registerIPO });
  }catch(error){
    res.status(500).json({error: "server not responding"})
    console.log(error)
  }
})

app.delete("/delete/:id",async (req,res)=>{
  try{
    const {id} =req.params
    const deleteipo= await IPO.findByIdAndDelete(id)
    res.json(deleteipo)
    console.log(deleteipo)
  }catch(error){
    res.status(500).json({error: "server not responding"})
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
