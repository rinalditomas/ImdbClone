const User = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findOne } = require('../models/User');




const UserController = {

    async test(req,res){
        const usuario = await User.find()
        console.log(usuario)
    },
    async register  (req,res){
        const body = req.body;

        const user = new User(body);
        user.salt  = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, user.salt);
        user.save().then((doc) => res.status(201).send(doc));

    },
    async login  (req,res){
             const {username,password} = req.body

            const usuario = await User.findOne({username:username})
            if (usuario) {
                const validPassword = await bcrypt.compare(password, usuario.password);
                if (validPassword) {
                    const token = jwt.sign(
                        {id:usuario.id,email:usuario.email,username:usuario.username,favorites:usuario.favorites},
                        "P5"
                        );
                    res.status(200).json({token});
                  } else {
                    res.status(400).json({ error: "Invalid Password" });
                  }
                } else {
                  res.status(401).json({ error: "User does not exist" });
                }
        },


    async addFavorite(req,res){
      
      const{user,movieData} = req.body


      try {
        const searchedUser= await User.findOne({username:user.username})
        const FavoritesMoviesFromUser = searchedUser.favorites

        const filter = FavoritesMoviesFromUser.some(movie => movie.imdbID === movieData.imdbID)
        
        if (filter == true){
          return res.status(500).send("This movie is already added to your favorites")
        }
        if(filter == false){
          User.updateOne(
            {username:user.username},
            {$push:{favorites:movieData}},
            function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log(success);
              }
          })
          res.status(200).send("Movie added to you favorite list")
        }
        
      }catch (error) {
        console.log(error)
      }      

            },


            async removeFavorite(req,res){
              const{user,movieData} = req.body
              
              try {
                const theUser = await User.findOne({username:user})
                const oldFavorites = theUser.favorites
                
                const newFavorites = oldFavorites.filter((favorite)=>favorite.imdbID != movieData.imdbID);
        
                 await User.updateOne(
                  {username:user},
                  {$set:{favorites:newFavorites}},
                  function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                })

                
                
                const theNewUser = await User.findOne({username:user})
                res.status(200).send(theNewUser);
                

              } catch (error) {
                console.log(error)
              }      
        
            },
            
}

module.exports = UserController;