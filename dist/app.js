"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const app = (0, express_1.default)();
const Databaseurl = process.env.DATABASE_URL;
console.log(Databaseurl);
mongoose_1.default.connect(Databaseurl, () => {
    console.log("Database connected successfully");
});
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.disable('etag');
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/', index_1.default);
app.use('/users', users_route_1.default);
app.use('/movie', movie_route_1.default);
const Port = 5000;
app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`);
});
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
