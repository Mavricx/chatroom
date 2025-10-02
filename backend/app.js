require('dotenv').config();
const passport=require('passport');
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const app=express();
const authRoute=require('./routes/auth.js')

const User=require('./models/user.js');
const connectDB=require("./utils/db.js");

app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_REDIRECT_URL
},async (accessToken,refreshToken,profile,done)=>{
   try{
    let user=await User.findOne({googleId:profile.id});
    if(!user){
        user=await User.create({
            googleId:profile.id,
            email:profile.emails[0].value,
            name:profile.displayName,
            givenName:profile.name.givenName,
            familyName:profile.name.familyName,
            profilePic:profile.photos[0].value
        });
    }
    return done(null,user);
   }
   catch(err){
    console.error(err,null);
    return done(err,null);
   }
}))



app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use("/auth",authRoute);



connectDB().then(()=>{
    const port=process.env.PORT || 5000;
    app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})
})