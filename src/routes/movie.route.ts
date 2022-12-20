import express,{Request,Response,NextFunction} from "express"
import { createMovie, create_movie, deleteMovie, edit, getMovies, movieDelete, updateMovie } from "../controller/movies.controller";
import { validateToken } from '../middleware/auth'

const router = express.Router()


 router.get('/movies', getMovies );

 router.post('/add-movie',validateToken,  createMovie)
 router.get('/add_movies', validateToken, create_movie)


 router.post("/edit-movie/:id", validateToken, updateMovie)
 router.get('/update-movie/:id',validateToken, edit)

router.post("/delete-movie/:id",validateToken, deleteMovie )
router.get("/delete-movie/:id",validateToken, movieDelete )

//validateToken to be reminde####
export default router