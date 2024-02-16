import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
   code:{
      type:String ,
      trim:true ,
      unique:[true , "Coupon Name is Unique"] ,
      required:[true , "Coupon Name is required"] ,
      minLength:[1 , "Should be More Than One Character"] ,
   } ,
   discount:{
      type:Number ,
      required:[true , "Coupon Discount is required"]
   } ,
   expired:{
      type:Date
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   }
} ,{
   timestamps:true
}) ;

schema.pre(/^find/ , function(){
   this.populate("createdBy")
})

export const couponModel = mongoose.model("coupon" , schema) ;