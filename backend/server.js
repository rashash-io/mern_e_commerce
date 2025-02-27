import dotenv from "dotenv"
import cors from 'cors'
import express from 'express'
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import Redis from "ioredis";
import path from 'path'

//Routes Import
import authRoutes from "./routes/auth.route.js";
import productRoutes from './routes/product.route.js';
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoute from "./routes/analytics.route.js"; 
import categoryRoutes from './routes/category.route.js';

dotenv.config()


//Setting up timezones
process.env.TZ = 'Africa/Cairo';


const app =express()
const port = process.env.NODE_PORT | 3000;

const __dirname = path.resolve();// the root dirtectoery of the project

app.use(
  cors({
    origin: [
       process.env.CLIENT_URL,
       process.env.LOCALHOST_URL,
       "http://10.0.10.115:3000",
       "http://10.0.10.115:5500",
       "https://m.stripe/6",
       "https://api.rashash.io"
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "HEAD", "PATCH"],
    credentials: true,
  })
);

// by default it wont let you upload images that are large,
//therefore setting the limit allows us to upload
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

//USE ROUTES
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/categories", categoryRoutes);
app.use("/coupons", couponRoutes);
app.use("/payments", paymentRoutes );
app.use("/analytics", analyticsRoute) ;

//running the static front end render
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  
  // if user visits any rooute besides the previous serve the static front end page
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
   })
}

app.listen(port, () => {
  console.log(`RASHASH STORE API is listening at ${process.env.LOCALHOST_URL}`);
  connectDB();
});
