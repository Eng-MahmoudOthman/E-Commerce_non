
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { userModel } from "../../../DataBase/models/user.model.js";



//& Get Logged User to Address :
export const getLoggedUserAddress = catchError(
   async(req , res , next)=>{
      const{_id} = req.user ;

      const {addresses} = await userModel.findById(_id);

      !addresses &&  next(new AppError("this User Not Added Address Or Not Found Address" , 404))
      addresses && res.json({message:"success" , Count:addresses.length  , address:addresses})
   }
)


//& Add Product to Address :
export const addAddress = catchError(
   async(req , res , next)=>{
      const{_id} = req.user ;

      const address = await userModel.findByIdAndUpdate(_id , {$addToSet:{addresses:req.body}}, {new:true});

      !address &&  next(new AppError("this User Not Added Address Or Not Found Address" , 404))
      address && res.json({message:"success" , address:address.addresses})
   }
)


//& Delete Address :
export const deleteAddress = catchError(
   async(req , res , next)=>{
      const{_id} = req.user ;

      const address = await userModel.findByIdAndUpdate(_id , {$pull:{addresses:{_id:req.params.id}}}, {new:true});

      !address &&  next(new AppError("this User Not Added Address Or Not Found Address" , 404))
      address && res.json({message:"success" , address:address.addresses})
   }
)
