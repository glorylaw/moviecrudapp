import express,{Request,Response,NextFunction} from "express"
import { creatUser,login } from "../controller/users.controller";
import UserInstance from "../models/users.models"

const router = express.Router()

router.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.send('respond with a resource');
  });
  
  
  router.post('/register', creatUser )
   router.post('/login', login)

export default router
