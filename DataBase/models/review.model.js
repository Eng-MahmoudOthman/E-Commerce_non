import mongoose, { Types } from "mongoose";

const schema =new mongoose.Schema({
   text:{
      type:String ,
      trim:true ,
      required:[true , "the Name is required"] ,
      minLength:[2 , "review Name is Short, should be Contain More Than 2 Character"] ,
      maxLength:[300 , "review Name is Long, should be Contain Less Than 100 Character"] ,
   } ,
   rate:{
      type:Number , 
      required:true
   } ,
   product:{
      type:Types.ObjectId , 
      ref:"product"
   } ,
   user:{
      type:Types.ObjectId , 
      ref:"user"
   } ,
} ,{
   timestamps:true
})

// schema.pre("find" , function(){
//    this.populate("user" , "name  email")
//    this.populate("product")
// })

// schema.pre(["find" , "findOne" , "findOneAndUpdate"] , function(){
//    this.populate("user" , "name  email")
//    this.populate("product")
//    }
// )

schema.pre(/^find/ , function(){
   this.populate("user" , "name email")
   this.populate("product")
})



export const reviewModel = mongoose.model("review" , schema) ;