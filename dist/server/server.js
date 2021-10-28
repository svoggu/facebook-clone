import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import { PostModel } from "./schemas/post.schema.js";
import { UserModel } from "./schemas/user.schema.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authHandler } from "./middleware/auth.middleware.js";
import path from "path";
dotenv.config();
console.log(process.env.MONGO_URI);
const access_secret = process.env.ACCESS_TOKEN_SECRET;
console.log(access_secret);
const saltRounds = 10;
const app = express();
// const server = http.createServer(app);
const __dirname = path.resolve();
const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));
console.log(clientPath);
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
mongoose
    // .connect("mongodb://localhost:27017/facebookdb")
    .connect(`${process.env.MONGO_URI}`)
    .then(() => {
    console.log("Connected to DB Successfully");
})
    .catch((err) => console.log("Failed to Connect to DB", err));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4202', 'http://localhost:3000', 'http://localhost:8080']
}));
app.use(express.json());
app.get("/api/", function (req, res) {
    res.json({ message: "test" });
});
app.get("/api/posts", function (req, res) {
    PostModel.find()
        .then((data) => res.json({ data }))
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.post("/api/create-post", function (req, res) {
    const { message } = req.body;
    const post = new PostModel({
        message
    });
    post
        .save()
        .then((data) => {
        res.json({ data });
    })
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.get("/api/users", authHandler, function (req, res) {
    UserModel.find({}, '-password')
        .then((data) => res.json({ data }))
        .catch((err) => {
        res.status(501);
        res.json({ errors: err });
    });
});
app.post("/api/create-user", function (req, res) {
    const { firstname, email, lastname, password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            const user = new UserModel({
                firstname,
                lastname,
                email,
                password: hash,
            });
            user
                .save()
                .then((data) => {
                res.json({ data });
            })
                .catch((err) => {
                res.status(501);
                res.json({ errors: err });
            });
        });
    });
});
app.delete("/api/delete-user/:id", function (req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({ data });
    });
});
app.put("/api/update-user/:id", function (req, res) {
    console.log("Update user");
    UserModel.findByIdAndUpdate(req.params.id, {
        $set: { firstname: req.body.firstname, email: req.body.email },
    }, {
        new: true,
    }, function (err, updateUser) {
        if (err) {
            res.send("Error updating user");
        }
        else {
            res.json(updateUser);
        }
    });
});
app.get('/api/logout', authHandler, function (req, res) {
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    });
    res.json({ message: 'Successfully Logged out' });
});
app.post("/api/login", function (req, res) {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then((user) => {
        console.log(user);
        bcrypt.compare(password, `${user?.password}`, function (err, result) {
            if (result) {
                console.log("It matches!");
                const accessToken = jwt.sign({ user }, access_secret);
                res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                });
                res.json({ message: 'Successfully Logged In' });
            }
            else {
                res.sendStatus(403);
            }
        });
    })
        .catch((err) => {
        return res.sendStatus(404);
    });
});
app.get('/api/check-login', authHandler, (req, res) => {
    res.json({ message: 'yes' });
});
// app.get("/api/test", function (req, res) {
//   res.json({message: "Hello World"});
// });
app.get("/api/*", function (req, res) {
    res.sendStatus(404);
});
app.listen(PORT, function () {
    console.log(`starting at localhost http://localhost:${PORT}`);
});
app.all("*", function (req, res) {
    const filePath = path.join(__dirname, '/dist/client/index.html');
    console.log(filePath);
    res.sendFile(filePath);
});
//# sourceMappingURL=server.js.map