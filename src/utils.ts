import Joi from "joi"
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcrypt"


export const registerSchema = Joi.object().keys({
    email:Joi.string().required(),
    fullname:Joi.string().required(),
    username:Joi.string().required(),
    password:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //confirm_password:Joi.ref("password")
    confirmPassword:Joi.any().equal(Joi.ref("password")).required().
    label("Confirm password").messages({"any.only":"{{#label}} does not match"})

})

export const option = {
    abortEarly:false,
    errors:{
        wrap:{
            label:""
        }
    }
}
export const GenerateSalt = async()=>{
    return await bcrypt.genSalt()
    }
    
    export const GeneratePassword = async(password:string, salt:string)=>{
        return await bcrypt.hash(password,salt)
    }

    export async function generateToken (_id: string) {
        if (process.env.JWT_SECRET) {
          return jwt.sign({ _id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
          });
        }
      };

    // export const verifySignature= async(signature:string)=>{
    //     return jwt.verify(signature, APP_SECRET) as JwtPayload
    // }

    export const loginSchema = Joi.object().keys({
        email:Joi.string().required(),
        password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    export const validatePassword = async(enteredPassword:string,savedPassword:string,salt:string)=>{
        return await GeneratePassword(enteredPassword,salt) === savedPassword
    }
    
    