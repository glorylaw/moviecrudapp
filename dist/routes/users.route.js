"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controller/users.controller");
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/register', users_controller_1.creatUser);
router.post('/login', users_controller_1.login);
exports.default = router;
