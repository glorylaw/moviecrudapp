"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.creatUser = exports.getUser = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
//import { registerSchema } from "../utils"
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.find();
        res.status(200).json({
            user
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            Error: "Internal server Error",
            route: "/",
        });
    }
});
exports.getUser = getUser;
const creatUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullname, password, confirmPassword, username } = req.body;
        const validateResult = utils_1.registerSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).render("error", {
                Error: validateResult.error.details[0].message,
            });
        }
        const salt = yield (0, utils_1.GenerateSalt)();
        const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
        const User = yield users_models_1.default.findOne({ email });
        if (!User) {
            const User = yield users_models_1.default.create({
                fullname,
                username,
                email,
                password: userPassword,
            });
            console.log(User);
            const Userexist = yield users_models_1.default.findOne({ email });
            return res.status(200).redirect("/movie/movies");
        }
        if (User) {
            return res.status(500).json({ error: "User already exists" });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            Error: "Internal server Error",
            route: "/users/register"
        });
    }
});
exports.creatUser = creatUser;
//=================== login user =================
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validateResult = utils_1.loginSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const user = yield users_models_1.default.findOne({ email: email });
        if (user) {
            const validation = yield bcrypt_1.default.compare(req.body.password, user.password);
            console.log(validation);
            if (validation) {
                const token = yield (0, utils_1.generateToken)(`${user._id}`); // generate token
                //save token inside cookie
                console.log(token);
                res.cookie('token', token);
                return res.status(200).redirect('/movie/movies');
                //return res.status(200).json({message:"user logged in"})
            }
            res.status(400).json({ message: "invalid email or password" });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            Error: "Internal server Error",
            route: "/users/login",
        });
    }
});
exports.login = login;
