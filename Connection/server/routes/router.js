const router = require('express').Router()
const User = require('../models/model')
const bcrypt = require('bcryptjs')

router.post('/signup', async(req,res)=>{
    const  {firstname,lastname,email, password} = req.body;

    if (!firstname  || !lastname || !email ||  !password ){
        return res.status(422).json({error: "fill all"})
    }
    try{
        const userExist = await  User.findOne({email : email});
        if(userExist){
            return res.status(422).json({error: "email already exists"});
        }
        else{
            const user = new User({firstname,lastname,email, password});

            await user.save();
            res.status(201).json({message: "registered successfully"})
        }
        
    }
    catch(err){
        console.log(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return  res.status(422).json({error: "fill all"})
        }
        const userLogin = await  User.findOne({email : email});
        if(userLogin){
             // console.log(userLogin)
             const isMatch = await bcrypt.compare(password, userLogin.password)
       
        if(!isMatch){
            res.status(400).json({message: "Invalid Data"})
        }
        else{
            res.json({message: "Login Successfully"})

        }

        }
        else{
            res.status(400).json({message: "Invalid Data"})

        }
    } 
    catch (err){
        console.log(err)

    }
})

module.exports = router;