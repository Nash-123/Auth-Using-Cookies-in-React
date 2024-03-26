import express from "express";
import cookieParser from "cookie-parser"; // Parses a very long cookie string and gets you an object
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true, // If we remove it cookie wont be set and auth wont be done
    origin: "http://localhost:5173"
}));

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET)
   
    res.cookie("token", token); // In Next JS we pass token through Cookie by default in every request
    res.cookie("token5", token);
    // Will put in the set-cookie header
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});


app.post("/logout", (req, res) => {
   // res.cookie("token", ""); // setting the Token while logging out to empty string 
    res.clearCookie("token"); // Same as above
    res.clearCookie("token5");
    res.json({
        message: "Logged out!"
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"))
})

app.listen(3007);