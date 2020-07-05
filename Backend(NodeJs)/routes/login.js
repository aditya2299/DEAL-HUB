const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const bcrypt = require('bcrypt');


router.post('/', async (req,res) => {


    try{
        const logged = await Login.find({ userName: req.body.userName });
        if (logged.length == 0) {
            res.status(404).send('User not found');
        }
        try {
            if(await bcrypt.compare(req.body.password, logged[0].password)) {
                res.json(logged[0]._id.toString());
            }
            else {
                res.status(404).send('Invalid Credentials');
            }
        }
        catch {
            res.status(500).send();
        }
        
    }
    catch(err){
        //res.status(404).end();
        res.json({message: err});
    }

});

module.exports = router;