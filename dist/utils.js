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
exports.validatePassword = exports.loginSchema = exports.generateToken = exports.GeneratePassword = exports.GenerateSalt = exports.option = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.registerSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    fullname: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //confirm_password:Joi.ref("password")
    confirmPassword: joi_1.default.any().equal(joi_1.default.ref("password")).required().
        label("Confirm password").messages({ "any.only": "{{#label}} does not match" })
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
function generateToken(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.JWT_SECRET) {
            return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
                expiresIn: "2d",
            });
        }
    });
}
exports.generateToken = generateToken;
;
// export const verifySignature= async(signature:string)=>{
//     return jwt.verify(signature, APP_SECRET) as JwtPayload
// }
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
const validatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.GeneratePassword)(enteredPassword, salt)) === savedPassword;
});
exports.validatePassword = validatePassword;
