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
exports.createMoviePage = exports.movieDelete = exports.deleteMovie = exports.edit = exports.updateMovie = exports.create_movie = exports.createMovie = exports.getMovies = void 0;
const movies_models_1 = __importDefault(require("../models/movies.models"));
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movies_models_1.default.find();
        // res.status(200).json({
        //     movie
        // })
        if (!movie) {
            res.status(404).render("error", { message: "Movies not found" });
        }
        else {
            res
                .status(200)
                .render("movies", { movies: movie });
            //   res.status(200).render('movies', { movies: result.value, message: message })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            Error: "Internal server Error",
            route: "/movie",
        });
    }
});
exports.getMovies = getMovies;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tittle, description, price, image } = req.body;
        const movie = yield movies_models_1.default.find();
        if (movie) {
            const createMovie = yield movies_models_1.default.create({
                tittle,
                description,
                price,
                image,
            });
            // res.status(200).render('movies', { movies: createMovie, message:  });
            //  return res.status(200).json({
            //     message:"movie created successfully",
            //     movie
            // })
            return res.status(201).redirect("/movie/movies");
        }
        return res.status(400).json({
            status: "failed to create movie",
        });
    }
    catch (err) {
        console.log(err.message);
        // console.log(err.stack)
        return res.status(500).json({
            Error: "Internal server Error",
            route: "/movie/movies",
        });
    }
});
exports.createMovie = createMovie;
// export async function create_movie(req: Request, res: Response) {
//   //res.render('add-movie')
//   return res.status(200).json({
//     message:"movie created successfully",
// })
// }
const create_movie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movies_models_1.default.find();
        // res.status(200).json({
        //     movie
        // })
        res.render("add-movie");
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            Error: "Internal server Error",
            route: "/movie",
        });
    }
});
exports.create_movie = create_movie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { tittle, description, image, price } = req.body;
        const updatemovie = yield movies_models_1.default.findOne({ _id: id });
        if (updatemovie) {
            const movie = yield movies_models_1.default.updateOne({ _id: id }, {
                tittle,
                description,
                image,
                price,
            });
            // return res.status(200).render("add-movie",{
            //     status: 'movie updated successfully',
            //     data: movie
            // })
            return res.status(201).redirect("/movie/movies");
        }
        return res.status(400).json({
            message: "unidentified data",
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
            routes: "movies/edit-movie/:id",
        });
    }
});
exports.updateMovie = updateMovie;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const id: string = req.params.id
    try {
        const id = req.params.id;
        //const updatemovie = await MovieInstance.updateOne({ _id: id });
        const movie = yield movies_models_1.default.findOne({ _id: id });
        console.log(movie);
        res.render("update", { id, movie });
    }
    catch (error) {
        console.log(error);
    }
});
exports.edit = edit;
// export const edit = async (req:Request,res:Response)=>{
//   try {
//       const movie= await MovieInstance.find()
//       res.status(200).json({
//           movie
//       })
//   } catch (err:any) {
//       console.log(err.message);
//   res.status(500).json({
//     Error: "Internal server Error",
//     route: "/movie",
//   });
//   }
// }
//delete movie
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const removeMovie = yield movies_models_1.default.findOneAndDelete({ _id: id });
        // return res.status(200).json({
        //    message: "deleted successfully"
        // })
        if (removeMovie) {
            return res.status(200).redirect("/movie/movies");
        }
        return res.status(400).json({
            message: "unidentified data",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "internal server error",
            routes: "movie/delete-movie/:id",
        });
    }
});
exports.deleteMovie = deleteMovie;
function movieDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            res.render("delete", { id });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.movieDelete = movieDelete;
function createMoviePage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var perPage = 9;
            var page = req.params.page || 1;
            const movie = yield movies_models_1.default.find().skip((perPage * page) - perPage).limit(perPage).exec(function (err, products) {
                // //movie.count().exec(function(err, count) {
                //     if (err) return next(err)
                //     res.render('movies', {
                //         products: products,
                //         current: page,
                //         pages: Math.ceil(count / perPage)
                //     })
                // })
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createMoviePage = createMoviePage;
