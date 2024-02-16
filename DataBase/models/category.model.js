import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
   name:{
      type:String ,
      trim:true ,
      unique:[true , "Category Name Already Exist"] ,
      required:[true , "Category Name is required"] ,
      minLength:[2 , "Category Name is Short, should be Contain More Than 2 Character"] ,
      maxLength:[200 , "Category Name is Long, should be Contain Less Than 200 Character"] ,
   } ,
   slug:{
      type:String ,
      lowercase:true ,
   } ,
   image:{
      type:String
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   }
} ,{
   timestamps:true
}) ;

schema.post("init" , function(doc){
   doc.image = process.env.BASE_URL + doc.image
})

schema.pre("find" , function(){
   this.populate("createdBy")
})

export const categoryModel = mongoose.model("category" , schema) ;