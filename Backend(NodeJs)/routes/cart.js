const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const mongoose = require('mongoose');


router.put('/:loginId', async (req,res) => {
    var new_cart = JSON.parse(req.body.new_cart);
    //console.log(new_cart);
    Login.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.loginId) },
        { $set: { user_cart: new_cart } },
        { upsert: true },
        function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                //console.log(user);
                res.status(204);
            }
        }
    );
});

router.get('/:loginId', async (req,res) => {
    Login.findById(mongoose.Types.ObjectId(req.params.loginId))
    .then(user => {
        var cart = user.user_cart;
        //console.log(cart);
        return res.status(200).json(cart);
    })
    .catch(err => res.status(404).send());
});

module.exports = router;