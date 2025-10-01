require('dotenv').config();
const passport=require('passport');
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const app=express();

app.use(session({secret:"process.env.CLIENT_SECRET",resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_REDIRECT_URL
},(accessToken,refreshToken,profile,done)=>{
    return done(null,profile);
}))

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.get("/auth/google", passport.authenticate("google",{scope:["profile","email"]}));
app.get("/auth/google/callback",
    passport.authenticate("google",{failureRedirect:"http://localhost:5173/home"}),
    (req,res)=>{
        console.log(req.user);
        res.send("Logged in with google: "+JSON.stringify(req.user));
    }
);

app.listen(5000,()=>{
    console.log("Server started on http://localhost:5000");
})