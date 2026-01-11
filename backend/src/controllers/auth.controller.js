import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const genToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );
};

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({message: 'All fields are required'});
        }

        const exsist = await User.findOne({email});
        if(exsist){
            return res.status(409).json({message: 'Email already exsist'});
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.status(201).json({
            token: genToken(user._id)
        });
    } catch (er) {
        console.error(er);
        res.status(500).json({message: 'Registration failed'});
    }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        res.json({
            token: genToken(user._id)
        });
    } catch (er) {
        console.error(er);
        res.status(500).json({message: 'Login Failed'});
    }
};


export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if(!user){
            return res.status(404).json({message: 'User nof found'});
        }

        res.json(user);
    } catch (er) {
        console.error(er);
        res.status(500).json({message: 'Failed to fetech user'});
    }
}



