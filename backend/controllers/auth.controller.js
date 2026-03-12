import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import tokenBlackListToken from "../models/blaclistToken.model.js";

export const registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const isUserAlreadyExists = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "User already exists with this email try another" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        //    Generating Token

        const token = await jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,

            }
        })

    } catch (error) {
        console.log("Error in RegisterUserController", error);
    }
}

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3. Verify Password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Generate Token
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        // 5. Set Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // 6. Response
        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.username}`,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Error in loginUserController", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logoutUserController = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            await tokenBlackListToken.create({ token })
        }

        if (!token) {
            return res.status(401).json({ message: "Token not found" })
        }

        res.clearCookie("token")
        res.status(200).json({
            success: true,
            message: "Logout Success"
        })
    } catch (error) {
        console.log({ error: error.message });

    }
}

export const getMeController = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "Data fetched Successfully",
            user: user
        });

    } catch (error) {
        console.log("Error in getMeController:", error.message);

        return res.status(500).json({ message: "Internal Server Error" });
    }
}
