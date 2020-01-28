const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {registerValidation} = require('../validation');
const {loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');

exports.user_signup_post = (req,res,next)=>{
    const {error} = registerValidation(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    User.findOne({email:req.body.email})
    .exec()
    .then(user =>{
        if (user){
            return res.status(409).json({
                message: "Mail exists"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    });
                }else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });     
                    user
                        .save()
                        .then(result=>{
                            console.log(result)
                            res.status(201).json({
                                message:"User created"
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json({
                                error:err
                            })
                        })
                    }
            })
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_login_post = (req, res, next) => {
    const {error} = loginValidation(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    } 
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if (user< 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth error"
            });
          }
          if (result) {
            const token = jwt.sign( // HS256
              {
                userId: user._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h" 
              }
            );
            return res.status(200).header('X-OBSERVATORY-AUTH',token).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

exports.user_logout_post = (req,res,next) => {
    res.status(200).json({
      message: "Logout Done!"
    });

};