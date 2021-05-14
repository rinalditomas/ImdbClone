const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js")
const checkJWT= require("../middleware/jwtmiddleware")
const User = require('../models/User')



router.get('/', UserController.test)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/addfavorites', UserController.addFavorite)
router.post('/removeFavorite', UserController.removeFavorite)


router.post ("/me",checkJWT , async (req,res,next) => {
    const {username,id} = req.user
    const usuario = await User.findOne({username:username})
    res.status(200).json(usuario);

    })



module.exports = router;