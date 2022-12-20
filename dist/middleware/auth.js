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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import jwt, {type JwtPayload} from 'jsonwebtoken'
const movies_models_1 = __importDefault(require("../models/movies.models"));
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const token = req.cookies.jwt;
        //   if (token) {
        //     jwt.verify(token, APP_SECRET, (err: any, decodedToken: any) => {
        //       if (err) {
        //         res.redirect("/login");
        //       } else {
        //         next();
        //       }
        //     });
        //   } else {
        //     res.redirect("/login");
        //   }
        let token = req.cookies.token;
        try {
            if (token === undefined) {
                return res.status(401).redirect("/login");
            }
            if (process.env.JWT_SECRET) {
                const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const { id } = verified;
                const user = yield movies_models_1.default.findOne({ id: id });
                if (!user) {
                    return res.status(401).json({
                        Error: "invalid Credentials"
                    });
                }
            }
            //Ver
            next();
        }
        catch (err) {
            // return res.status(401).json({
            //     Error:"Unauthorized"
            // })
            console.log(err);
        }
    });
}
exports.validateToken = validateToken;
;
