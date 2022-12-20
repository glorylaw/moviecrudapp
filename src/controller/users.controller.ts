import express,{Request,Response,NextFunction} from "express"
import UserInstance from "../models/users.models"
import{UserAttribute} from "../models/users.models"
import { GeneratePassword, GenerateSalt, generateToken, loginSchema, option, registerSchema, validatePassword } from "../utils"
import bcrypt from "bcrypt"
//import { registerSchema } from "../utils"


export const getUser = async (req:Request,res:Response)=>{
    try {
        const user = await UserInstance.find()
        res.status(200).json({
            user
        })        
    } catch (err:any) {
        console.log(err.message);
    res.status(500).json({
      Error: "Internal server Error",
      route: "/",
    });
    }
}

export const creatUser = async(req:Request,res:Response)=>{
    try {
        const { email, fullname, password, confirmPassword,username } = req.body;

        const validateResult = registerSchema.validate(req.body, option);

        if (validateResult.error) {
            return res.status(400).render("error",{
              Error: validateResult.error.details[0].message,
            });
          }

          const salt = await GenerateSalt();
          const userPassword = await GeneratePassword(password, salt);

          const User = await UserInstance.findOne({email})
          if(!User){ 
            const User= await UserInstance.create({
                fullname,
                username,
                email,
                password:userPassword,

            })
            console.log(User)
            const Userexist = await UserInstance.findOne({email})
            
             return res.status(200).redirect("/movie/movies")

          }
          if (User) {
            return res.status(500).json({ error: "User already exists" });
          } 


    } catch (err:any) {
        console.log(err.message);
    res.status(500).json({
      Error: "Internal server Error",
      route: "/users/register"
    })
    }
}

//=================== login user =================

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const validateResult = loginSchema.validate(req.body, option);

        if (validateResult.error) {
            return res.status(400).json({
              Error: validateResult.error.details[0].message,
            });
          }
         
          const user = await UserInstance.findOne({email:email})as unknown as UserAttribute 
          
          if(user){
            const validation = await bcrypt.compare(req.body.password, user.password)
            console.log(validation)
            if(validation){
                
                const token = await generateToken(`${user._id}`) // generate token
                //save token inside cookie
                console.log(token)
                res.cookie('token', token)
        return res.status(200).redirect('/movie/movies')
        //return res.status(200).json({message:"user logged in"})
        
            }
            res.status(400).json({message:"invalid email or password"})
        
          }

    } catch (err:any) {
     console.log(err.message);
    res.status(500).json({
      Error: "Internal server Error",
      route: "/users/login", 
   })
}
}