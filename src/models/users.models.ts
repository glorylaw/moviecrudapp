import mongoose,{Schema} from "mongoose";


export interface UserAttribute{
    _id:string;
    fullname:string;
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
    salt:string;

}

const userSchema = new Schema({
   
    fullname:{type:String},
    username:{type:String},
    email:{type:String,
        required:true,
        unique:true
    },
    password:{type:String},
    confirmPassword:{type:String},
    salt:{type:String}
},
{   timestamps:true

})

const UserInstance =mongoose.model<UserAttribute>("User",userSchema )

export default UserInstance

