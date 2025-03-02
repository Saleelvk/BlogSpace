const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: ["http://localhost:5173", "https://blogspace-jh9a.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],  // Ensure POST is allowed
    credentials: true
}));


// Routes
const authRoute = require("./routes/authRoute");
const userRouter = require("./routes/userRouter");
const postRoutes = require("./routes/postRoute");
const commendRoute = require("./routes/commendRoute");

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/comment",commendRoute);


// Use Routes



app.listen(PORT, () => {
    console.log("Server running on port", PORT);
    connectDb();
});
