import express, { Request, Response, NextFunction } from "express";
import MovieInstance from "../models/movies.models";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movie = await MovieInstance.find();

    // res.status(200).json({
    //     movie
    // })
    if (!movie) {
      res.status(404).render("error", { message: "Movies not found" });
    } else {
      res
        .status(200)
        .render("movies", { movies: movie });
      //   res.status(200).render('movies', { movies: result.value, message: message })
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      Error: "Internal server Error",
      route: "/movie",
    });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { tittle, description, price, image } = req.body;

    const movie = await MovieInstance.find();

    if (movie) {
      const createMovie = await MovieInstance.create({
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
  } catch (err: any) {
    console.log(err.message);
    // console.log(err.stack)
    return res.status(500).json({
      Error: "Internal server Error",
      route: "/movie/movies",
    });
  }
};

// export async function create_movie(req: Request, res: Response) {
//   //res.render('add-movie')
//   return res.status(200).json({
//     message:"movie created successfully",

// })
// }

export const create_movie = async (req: Request, res: Response) => {
  try {
    const movie = await MovieInstance.find();
    // res.status(200).json({
    //     movie
    // })
    res.render("add-movie");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      Error: "Internal server Error",
      route: "/movie",
    });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { tittle, description, image, price } = req.body;
    const updatemovie = await MovieInstance.findOne({ _id: id });
    if (updatemovie) {
      const movie = await MovieInstance.updateOne(
        { _id: id },
        {
          tittle,
          description,
          image,
          price,
        }
      );
      // return res.status(200).render("add-movie",{
      //     status: 'movie updated successfully',
      //     data: movie
      // })
      return res.status(201).redirect("/movie/movies");
    }
    return res.status(400).json({
      message: "unidentified data",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      routes: "movies/edit-movie/:id",
    });
  }
};
export const edit = async (req: Request, res: Response) => {
  //const id: string = req.params.id
  try {
    const id = req.params.id;
    //const updatemovie = await MovieInstance.updateOne({ _id: id });
    const movie = await MovieInstance.findOne({ _id: id });
    console.log(movie)
    res.render("update", { id,movie });
  } catch (error) {
    console.log(error);
  }
};

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

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const removeMovie = await MovieInstance.findOneAndDelete({ _id: id });
    // return res.status(200).json({
    //    message: "deleted successfully"
    // })
    if (removeMovie) {
      return res.status(200).redirect("/movie/movies");
    }

    return res.status(400).json({
      message: "unidentified data",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      routes: "movie/delete-movie/:id",
    });
  }
};

export async function movieDelete(req: Request, res: Response) {
  try {
    const id = req.params.id;
    res.render("delete", { id });
  } catch (error) {
    console.log(error);
  }
}
export async function createMoviePage(req:Request,res:Response,next:NextFunction){
  try{
    var perPage:number = 9
    var page:any = req.params.page || 1
    const movie = await MovieInstance.find().skip((perPage * page) - perPage).limit(perPage).exec(function(err, products) {
            // //movie.count().exec(function(err, count) {
            //     if (err) return next(err)
            //     res.render('movies', {
            //         products: products,
            //         current: page,
            //         pages: Math.ceil(count / perPage)
            //     })
            // })
        })
  }
catch(error){
  console.log(error)

}
}