
import { reviewModel} from "../../../DataBase/models/review.model.js"
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";


//& Get All reviews :
export const getAllReview = catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(reviewModel.find({}), req.query ).pagination().fields().search().filter().sort();
      const reviews = await apiFeature.mongooseQuery;
      if(!reviews.length) return next(new AppError("Reviews is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  reviews})
   }
)





//& Add New Review :
export const addReview = catchError(
   async(req , res , next)=>{
      const {text , rate , product } = req.body ;
      const {_id} = req.user ;

      //& Check On Review Name Is Present Or Not :
      const reviewExist = await reviewModel.findOne({user:_id , product:product})
      if(reviewExist){
         return next(new AppError("my be write review before" , 402))
      }

      req.body.user = _id
      const review = new reviewModel(req.body) ;

      await review.save() ;
      res.json({message:"success" , NewReview:review})
   }
)




//& Get Single Review :
export const getSingleReviewById = catchError(
   async(req , res , next)=>{
      const review = await reviewModel.findById(req.params?.id) ;

      !review && next(new AppError("Not Found Review" , 404))
      review && res.json({message:"success" , review})
   }
)



//& Update Review By Id :
export const updateReviewById = catchError(
   async(req , res , next)=>{
      const{text , rate} = req.body ;
      const{_id} = req.user ;


      const review = await reviewModel.findOneAndUpdate({_id:req.params.id , user:_id} , req.body , {new:true}) ;
      const reviews = await reviewModel.find();

      !review &&  next(new AppError("this User Not Added Review Or Not Found Review" , 404))
      review && res.json({message:"success" , updateReview:review , all_reviews:reviews})
   }
)


//& Delete Review By Id :
export const deleteReviewId = deleteOne(reviewModel , "Review" , "Reviews")



export const checkDeleteReview = catchError(
   async(req , res , next)=>{
      const review = await reviewModel.findOne({_id:req.params.id , user:req.user._id}) ;
   
      if(!review)  return next(new AppError("this User Not Added Review Or Not Found Review", 401));
      next();
   }
)











