import mongoose, { Types } from "mongoose";

const schema =new mongoose.Schema({
   title:{
      type:String ,
      trim:true ,
      unique:[true , "Product Title Already Exist"] ,
      required:[true , "Product Title is required"] ,
      minLength:[2 , "Product Title is Short, should be Contain More Than 2 Character"] ,
      maxLength:[200 , "Product Title is Long, should be Contain Less Than 200 Character"] ,
   } ,
   slug:{
      type:String ,
      lowercase:true ,
      required:[true , "Product Name is required"]
   } ,
   imgCover:{
      type:String
   } ,
   images:[{
      type:String ,
   }] ,
   description:{
      type:String ,
      minLength:[10 , " More than 10 Character"] ,
      maxLength:[1500 , " Less than 500 Character"] ,
      required:[true , " description is required"]
   } ,
   price:{
      type:Number ,
      required:[true , "Price is required"]
   } ,
   priceAfterDiscount:{
      type:Number ,
      required:[true , "Price After Discount is required"]
   } ,
   quantity:{
      type:Number ,
      default:0 ,
   } ,
   sold:{
      type:Number ,
      default:0 ,
   } ,
   rateCount:{
      type:Number ,
      default: 0 ,
   } ,
   rateAvg:{
      type:Number ,
      default: 0 ,
   } ,
   category:{
      type:Types.ObjectId , 
      ref:"category"
   } ,
   subcategory:{
      type:Types.ObjectId , 
      ref:"subcategory"
   } ,
   brand:{
      type:Types.ObjectId , 
      ref:"brand"
   } ,
   createdBy:{
      type:Types.ObjectId , 
      ref:"user"
   } ,
} , {timestamps:true , toJSON: { virtuals: true } }) ;



// schema.post("init" , function(doc){
//    if(doc.imgCover || doc.images){
//       doc.imgCover = process.env.BASE_URL + doc.imgCover
//       doc.images = doc.images?.map((ele)=>{
//          return ele = process.env.BASE_URL + ele
//       })
//    }
// })

schema.post("init" , function(doc){
   if(doc.imgCover) {
      doc.imgCover = process.env.BASE_URL + doc.imgCover
   }
   
   if(doc.images) {
      doc.images = doc.images.map((ele)=>{
         return ele = process.env.BASE_URL + ele
      })
   }
})


schema.pre("find" , function(){
   this.populate("category brand subcategory")
})


//& Virtual Populate in Mongoose Virtuals :
schema.virtual('myReviews', {
   ref: 'review',
   localField: '_id',
   foreignField: 'product',
   justOne: true
});

schema.pre("findOne" , function(){
   this.populate("myReviews")
})

export const productModel = mongoose.model("product" , schema) ;