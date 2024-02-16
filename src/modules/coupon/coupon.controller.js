
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";
import { couponModel } from "../../../DataBase/models/coupon.model.js";


//& Get All Coupons :
export const getAllCoupon = catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(couponModel.find({}), req.query ).pagination().fields().search().filter().sort();
      const coupons = await apiFeature.mongooseQuery;
      if(!coupons.length) return next(new AppError("Coupons is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  coupons})
   }
)





//& Add New Coupon :
export const addCoupon = catchError(
   async(req , res , next)=>{
      req.body.createdBy = req.user._id
      const couponExist = await couponModel.findOne({code:req.body.code}) ;
      if(couponExist) return next(new AppError("Coupon Already Exist")) ;
      
      const coupon = new couponModel(req.body) ;
      await coupon.save() ;
      res.json({message:"success" , NewCoupon:coupon})
   }
)




//& Get Single Coupon :
export const getSingleCoupon = catchError(
   async(req , res , next)=>{
      const coupon = await couponModel.findById(req.params?.id) ;

      !coupon && next(new AppError("Not Found Coupon" , 404))
      coupon && res.json({message:"success" , coupon})
   }
)



//& Update coupon By Id :
export const updateCoupon = catchError(
   async(req , res , next)=>{
      const coupon = await couponModel.findByIdAndUpdate(req.params.id  , req.body , {new:true}) ;
      !coupon &&  next(new AppError("this User Not Added Coupon Or Not Found Coupon" , 404))
      coupon && res.json({message:"success" , updateCoupon:coupon})
   }
)


//& Delete Coupon By Id :
export const deleteCoupon = deleteOne(couponModel , "Coupon" , "Coupons")












