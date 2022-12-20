import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()
//import jwt, {type JwtPayload} from 'jsonwebtoken'
import MovieInstance, { MovieAttribute } from "../models/movies.models"

export async function validateToken(req: Request, res: Response, next: NextFunction) {
   
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


    let token =req.cookies.token
    try{
   if(token === undefined){
    return res.status(401).redirect("/login")
   }
   if(process.env.JWT_SECRET){
   const verified = jwt.verify(token,process.env.JWT_SECRET)
    const {id} = verified as {[key:string]:string}
    const user = await MovieInstance.findOne({id:id})
    if(!user){
        return res.status(401).json({
            Error:"invalid Credentials"
        })
    }
   }
   //Ver
    next()
    }catch(err){
        // return res.status(401).json({
        //     Error:"Unauthorized"
        // })
        console.log(err)
    }
    };



