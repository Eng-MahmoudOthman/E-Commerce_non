import { userModel } from "../../../DataBase/models/user.model.js";
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";




export const signUp = catchError(
   async (req , res , next)=>{
      const user = new userModel(req.body) ;
      await user.save();
      const token = jwt.sign({userId:user._id , name:user.name , email:user.email , role:user.role}  , process.env.SECRET_KEY )
      return res.json({message:"success" ,token  , id:user._id}) ;
   }
)

export const signIn = catchError(
   async (req , res , next)=>{
      const{email , password} = req.body ;
      const user = await userModel.findOne({email}) ;
      if(user && bcrypt.compareSync(password , user?.password)) {
         const token = jwt.sign({userId:user._id , name:user.name , email:user.email , role:user.role} , process.env.SECRET_KEY )
         return res.json({message:"success"  , token}) ;
      }
      return next(new AppError("Email Or Password InCorrect" , 401)) ;
   }
)


export const changePassword = catchError(
   async (req , res , next)=>{
      const{oldPassword , newPassword} = req.body ;
      const user = await userModel.findById(req.user._id) ;
      if(user && bcrypt.compareSync(oldPassword , user.password)) {
         const token = jwt.sign({userId:user._id , name:user.name , email:user.email , role:user.role} , process.env.SECRET_KEY )

         // let decoded = jwt.verify(token , process.env.SECRET_KEY) ;
         // await userModel.findByIdAndUpdate(req.user._id , {password:newPassword , passwordChangedAt:decoded.iat})
         // console.log("....","|", decoded.iat);
         
         await userModel.findByIdAndUpdate(req.user._id , {password:newPassword , passwordChangedAt:Date.now()})
         return res.json({message:"success"  , token}) ;
      }
      return next(new AppError("Email Or Old Password InCorrect" , 401)) ;
   }
)




export const protectedRoutes = catchError(
   async (req , res , next)=>{
      const{token} = req.headers ;

      // 1- Check Token Exist Or Not
      if(!token) return next(new AppError("Token Not Exist" , 401)) ;

      // 2- verify Token
      let decoded = jwt.verify(token , process.env.SECRET_KEY) ;
      if(!decode) return next(new AppError("Token Not Valid" , 401)) ;

      // 3- Check Exist User Or Not
      const user = await userModel.findById(decoded.userId) ;
      if(!user) return next(new AppError("User Not Exist.?" , 401)) ;

      if(user.passwordChangedAt){
         // 4- Change Password And Token Expired
         let time = parseInt(user?.passwordChangedAt.getTime() / 1000) ;
         // console.log(time , "|" , decoded.iat);
         if(time > decoded.iat) return next(new AppError("Token Not Valid..Login again" , 401)) ;
      }

      req.user = user
      next();
   }
)




export const allowTo = (...roles)=>{

   return  catchError(
      async (req , res , next)=>{
         let adminRole = roles.includes(req.user.role) ;
         if(!adminRole) return next(new AppError("Not Authorization Entered"))
         next()
      }
   )
}




// export const protectedRoutes = catchError(
//    async (req , res , next)=>{
//       const{token} = req.headers ;

//       // 1- Check Token Exist Or Not
//       if(!token) return next(new AppError("Token Not Exist" , 401)) ;

//       // 2- verify Token
//       let decoded = jwt.verify(token , process.env.SECRET_KEY) ;
//       if(!decode) return next(new AppError("Token Not Valid" , 401)) ;

//       // 3- Check Exist User Or Not
//       const user = await userModel.findById(decoded.userId) ;
//       console.log(decoded);
//       if(!user) return next(new AppError("User Not Exist" , 401)) ;

//       // 4- Change Password And Token Expired
//       let time = user.passwordChangedAt
//       console.log(time);
//       console.log(decoded.iat);
//       if(time !== decoded.iat){
//          return next(new AppError("Token Not Valid" , 401)) ;
//       }else {
//          return res.json({message:"success"})
//       }

//    }
// )

