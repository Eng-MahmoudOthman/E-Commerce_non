import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
   name:{
      type:String , 
      required : true ,
      lowercase:true ,
      minLength:[2 , "Should be Character Count More Than 2 Character"] ,
      maxLength:[50 , "Should be Character Count Less Than 50 Character"] ,
   } ,
   email:{
      type:String ,
      required:true ,
      unique:[true , "Email is Required"]
   } ,
   password :{
      type:String ,
      required :[true , "Password is required"] 
   } ,
   isActive:{
      type:Boolean ,
      default:false
   } ,
   isBlocked:{
      type:Boolean ,
      default:false
   } ,
   confirmedEmail:{
      type:Boolean ,
      default:false
   } ,
   role:{
      type:String ,
      lowercase:true , 
      enum:["user" , "admin"] ,
      default:"user"
   } ,
   confirmedCode:{
      type:Number 
   } ,
   wishList:[{
      type:Types.ObjectId , 
      ref:"product"
   }] ,
   addresses:[{
      street:String , 
      phone:String ,
      city :String
   }] ,
   // passwordChangedAt:{
   //    type:Number 
   // } ,
   passwordChangedAt:{
      type:Date 
   } ,
} , { timestamps:true } )


//& Hash Password Before Save When Add User :
userSchema.pre("save"  , function(){
   if(this.password) this.password = bcrypt.hashSync(this.password , 8) ;
}) ;


//& Hash Password Before Save When Update User :
userSchema.pre("findOneAndUpdate" , function(){
   if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 8) ; 
   // this.populate("wishList")
}) ;

// userSchema.pre("findOne"  , function(){
//    this.populate("wishList")
// }) ;


// //& Hash Password Before Save When Add User :
// userSchema.pre(["find" , "findOneAndUpdate"] , function(){
//    this.password = bcrypt.hashSync(this.password , 8) ;
// }) ;



// userSchema.pre("save" , function(){
//    console.log(this);
// }) ;

// userSchema.post("save" , function(){
//    console.log(this);
// }) ;


export const userModel = model("user" , userSchema)
