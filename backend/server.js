const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://172.16.5.89:3000",
    credentials: true
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");

        const PORT = process.env.PORT;

        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
    }
};

startServer();