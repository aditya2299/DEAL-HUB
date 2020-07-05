const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Login = require('../models/Login');


router.post('/', async (req,res) => {

    try{
        const salt = await bcrypt.genSalt();
        const hashPassword = await  bcrypt.hash(req.body.password, salt);
        //console.log(salt);
        //console.log(hashPassword);
        
        const log = new Login({
            userName: req.body.userName,
            password: hashPassword,
        });
        const logged = await log.save();
        res.json(logged._id.toString());
        //res.status(201).send();
        
    }
    catch(err){
        res.status(403).send();
        //res.json({message: err});
    }

});

module.exports = router;