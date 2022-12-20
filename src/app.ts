import createError, {HttpError} from 'http-errors';
import express,{Request,Response,NextFunction} from "express";
import logger from "morgan";
import path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

import indexRouter from "./routes/index"
import usersRouter from "./routes/users.route"
import moviesRouter from "./routes/movie.route"


const app = express()
const Databaseurl = process.env.DATABASE_URL as string
console.log(Databaseurl)

mongoose.connect(Databaseurl, ()=>{
    console.log("Database connected successfully")
}) 

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.disable('etag');


app.use(express.json())
app.use(logger("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', moviesRouter)

const Port = 5000

app.listen(Port, ()=>{
   console.log(`Server running at http://localhost:${Port}`)

})

app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

export default app