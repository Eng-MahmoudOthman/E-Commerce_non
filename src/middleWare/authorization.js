
// import jwt  from 'jsonwebtoken' ;
// import { AppError } from '../utilities/AppError.js';
// import { userModel } from '../../DataBase/models/user.model.js';




// //& Authorization :
// export const authorization = (req , res , next)=>{
//    const{token} = req.headers ;

//    //& Check Token is Exist Or Not :
//    if(!token){
//       next(new AppError("Token Not Found *Please Enter Valid Token" , 402))
//    }
   
//    //& Verify Token :
//    jwt.verify(token , process.env.SECRET_KEY , async (error , result)=>{
//       //& Handle Error In Token :
//       if(error){
//          return next(new AppError("Token Not Found Or InCorrect") , 404) ;
//       }

//       //& Check User is Exist Or Not :
//       const user = await userModel.findById(result.id) ;
//       if(!user){
//          return next(new AppError("User Not Found In DataBase") , 404) ;
//       }

//       //& Check User is Admin Or Not :
//       if(result?.role == "admin"){
//          const user = await userModel.findById(result.id).select("name , email , role , _id") ;
//          req.user = user ;
//          next() ;
//       }else{
//          return next(new AppError("Only Admin Can Enter") , 401) ;
//       }
//    })
// }