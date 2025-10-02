const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.js');

router.get('/google',authController.googleAuth);

router.get('/google/callback',authController.loginCallback);

router.get('/logout',authController.logout);

module.exports=router;



