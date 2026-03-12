import 'dotenv/config'; // Loads .env immediately
import express from 'express';
import connectToDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser())

// Connect to Database
connectToDb()

// Custiom Router
app.use('/api/auth',authRouter)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
