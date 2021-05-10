const User = require('../models/User')
const jwt = require("jsonwebtoken");


const UserController = {

    async test(req,res){
        const usuario = await User.find()
        console.log(usuario)
    },
    async register  (req,res){
         const body = req.body    
       try {
           const usuario = await User.create(req.body)
           const result = await usuario.save()
           res.status(200).send(result)
       } catch (error) {
           res.status(404).json({message: error.message})
       }
    },
    async login  (req,res){
             const {username,password} = req.body

       try {
            const usuario = await User.findOne({username:username})

            if (!usuario) return res.status(401).send('El usuario no existe') 

            const isValid = await usuario.validPassword(password)

              
            if (isValid !== true)return res.status(401).send('La password es incorrecta')
            const token = jwt.sign(
            {id:usuario.id,email:usuario.email,username:usuario.username,favoritos:usuario.favoritos},
            "P5");
        return res.status(200).json({token});
           
       } catch (error) {
        console.log(error)
       }
    }

}

module.exports = UserController;