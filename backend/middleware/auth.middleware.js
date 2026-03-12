import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Recommended
import tokenBlackListToken from '../models/blaclistToken.model.js';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Is Token blacklisted checking

        const isTokenBlackListed  = await tokenBlackListToken.findOne({token})

        if(isTokenBlackListed){
            return res.status(401).json({message:"Invalid token"})
        }
        


        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authUser;
