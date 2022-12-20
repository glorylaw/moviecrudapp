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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
// let token: string[];
require("dotenv").config();
/* Connecting to the database before each test. */
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.DATABASE_URL);
}));
/* Closing database connection after each test. */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('Post/Get/Update/Delete', () => {
    //TESTING POSTING ROUTES
    describe('Post routes', () => {
        describe('', () => {
            //post add movie;
            it('registers user', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(app_1.default).post('/users/register').send({
                    //define a register
                    fullname: "Lawrence glory",
                    username: "glorylaw",
                    email: "oghenekevwe@gmail.com",
                    password: "12345",
                    confirmPassword: "12345"
                }).expect(302);
                //    token = res.headers['set-cookie'];
            }));
            //login user;
            it('logins in user', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield (0, supertest_1.default)(app_1.default).post('/users/login').send({
                    email: "oghenekevwe@gmail.com",
                    password: "12345"
                }).expect(302);
            }));
            //post add movies;
            it('creates movie for user', () => __awaiter(void 0, void 0, void 0, function* () {
                const movie = yield (0, supertest_1.default)(app_1.default).post('/movie/add-movie').send({
                    tittle: "Legend of the seeker",
                    description: "richard cipher ",
                    price: 2300,
                    image: "legendlink"
                }).expect(302);
            }));
        });
        //TESTING GET ROUTES
        describe('get routes', () => {
            //get all movies
            it('get  products should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(app_1.default).get('/movie/movies');
                expect(200);
            }));
        });
        //TESTING UPDATE ROUTES
        describe('update routes', () => {
            //update movie;
            it('updates movie for a user', () => __awaiter(void 0, void 0, void 0, function* () {
                const updateMovie = yield (0, supertest_1.default)(app_1.default).put('/movie/edit-movie/:id').send({
                    tittle: "Merlin",
                    description: "richard cipher loves mother confessor and slays dark magic",
                    price: 2200,
                    image: "image rendered"
                });
                expect(302);
            }));
        });
        //TESTING DELETE ROUTES
        describe('delete routes', () => {
            it('delete movie from a user', () => __awaiter(void 0, void 0, void 0, function* () {
                const id = '62d9e62e0556e6f5141d6434';
                yield (0, supertest_1.default)(app_1.default).delete(`/movie/delete-movie/${id}`);
                expect(200);
            }));
        });
    });
});
