import mongoose,{Schema} from "mongoose";


export interface MovieAttribute{
    _id:string;
    tittle:string;
    description:string;
    price:number;
    image:string;
    
}

const movieSchema = new Schema({
   
    tittle:{type:String},
    description:{type:String},
    price:{type:Number},
    image:{type:String},

},
{   timestamps:true

})

const MovieInstance = mongoose.model<MovieAttribute>("Movie",movieSchema )

export default MovieInstance

