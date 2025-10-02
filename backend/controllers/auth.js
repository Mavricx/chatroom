const passport=require('passport');

module.exports.googleAuth=passport.authenticate('google',{scope:['profile','email']});

module.exports.loginCallback = [
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/home' }),
    (req,res)=>{
        console.log(req.user);
        res.redirect('http://localhost:5173/home');
    }
];


module.exports.logout = async (req, res,next) => {
    req.logout(err => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.redirect("http://localhost:5173");
        })
    });
}
