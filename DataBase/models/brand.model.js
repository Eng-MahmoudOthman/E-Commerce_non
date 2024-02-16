import mongoose, { Types } from "mongoose";

const schema =new mongoose.Schema({
   name:{
      type:String ,
      trim:true ,
      unique:[true , "Brand Name Already Exist"] ,
      required:[true , "Brand Name is required"] ,
      minLength:[2 , "Brand Name is Short, should be Contain More Than 2 Character"] ,
      maxLength:[100 , "Brand Name is Long, should be Contain Less Than 100 Character"] ,
   } ,
   slug:{
      type:String ,
      lowercase:true ,
      required:[true , "Brand Name is required"]
   } ,
   logo:{
      type:String ,
      required:[true , "Brand Image Is required"]
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   }
} ,{
   timestamps:true
})

schema.post("init" , function(doc){
   doc.logo = process.env.BASE_URL + doc.logo
})

schema.pre("find", function (){
   this.populate("createdBy")
})




export const brandModel = mongoose.model("brand" , schema) ;