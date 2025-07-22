const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (userId) => jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "1h"});

exports.register = async (req, res) => {
    const {username, password} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if(existingUser) return res.status(400).json({message: "user already exist"})
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password : hashedPassword});
        
        const token = generateToken(user._id);

        res.cookie( "token", token, {
                     httpOnly : true,
                     samSite: "none",
                     maxAge: 24*60*60*1000,
                     secure: true })
            .status(200)
            .json({message: "token generated successfully"});
    } catch (error) {
        res.status(500).json({message: "error registering the user"});
    }
};

exports.login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const userExist = await User.findOne({username});
        if(!userExist) return res.status(404).json({message: "user not found, please register"});
        const passwordMatched = await bcrypt.compare(password, userExist.password);
        if(!passwordMatched) return res.status(400).json({message: "wrong credentials"});
        
        const token = generateToken(userExist._id);
        res.cookie("token", token, {
                     httpOnly: true,
                     samSite: "none",
                     secure: true,
                     maxAge: 24*60*60*1000})
           .status(200)
           .json({message: "token generated successfully"});
    } catch (error) {
        res.status(500).json({message: "login failed"});
    }
};

exports.logout = (req,res) => {
      res.clearCookie("token").status(200).json({message: "logged out successfully"})
};

