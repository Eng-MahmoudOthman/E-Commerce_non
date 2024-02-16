
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { userModel } from "../../../DataBase/models/user.model.js";



//& Get Logged User to WishList :
export const getLoggedUserWishList = catchError(
   async(req , res , next)=>{
      const{_id} = req.user ;

      const {wishList} = await userModel.findById(_id).populate("wishList");

      !wishList &&  next(new AppError("this User Not Added wishList Or Not Found wishList" , 404))
      wishList && res.json({message:"success" , Count:wishList.length  , WishList:wishList})
   }
)


//& Add Product to WishList :
export const addToWishList = catchError(
   async(req , res , next)=>{
      const{product} = req.body ;
      const{_id} = req.user ;

      const wishList = await userModel.findByIdAndUpdate(_id , {$addToSet:{wishList:product}}, {new:true}).populate("wishList");

      !wishList &&  next(new AppError("this User Not Added wishList Or Not Found wishList" , 404))
      wishList && res.json({message:"success" , WishList:wishList.wishList})
   }
)

//& Delete Product to WishList :
export const deleteToWishList = catchError(
   async(req , res , next)=>{
      const{id} = req.params ;
      const{_id} = req.user ;

      const wishList = await userModel.findByIdAndUpdate(_id , {$pull:{wishList:id}}, {new:true}).populate("wishList");

      !wishList &&  next(new AppError("this User Not Added wishList Or Not Found wishList" , 404))
      wishList && res.json({message:"success" , WishList:wishList.wishList})
   }
)
