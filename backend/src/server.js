import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import {conDB} from './config/db.js'

conDB();
app.listen(process.env.PORT, () => console.log('Server Running'));