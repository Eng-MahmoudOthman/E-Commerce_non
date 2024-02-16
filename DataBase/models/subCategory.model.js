import mongoose, { Types } from "mongoose";

const schema =new mongoose.Schema({
   name:{
      type:String ,
      trim:true ,
      unique:[true , "subCategory Name Already Exist"] ,
      required:[true , "subCategory Name is required"] ,
      minLength:[2 , "subCategory Name is Short, should be Contain More Than 2 Character"] ,
      maxLength:[500 , "subCategory Name is Long, should be Contain Less Than 500 Character"] ,
   } ,
   slug:{
      type:String ,
      lowercase:true ,
      required:[true , "subCategory Name is required"]
   } ,
   category:{
      type:Types.ObjectId , 
      ref:"category"
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   }
} ,{
   timestamps:true
})


schema.pre("find" , function(){
   this.populate("category")
})

export const subcategoryModel = mongoose.model("subcategory" , schema) ;
