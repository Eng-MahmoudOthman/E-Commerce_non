import { AppError } from "../utilities/AppError.js";


export const validation = (schema)=>{
   return (req , res , next)=>{
      let filter = {} ;
      if(req.file){
         filter = {image:req.file , ...req.body , ...req.params , ...req.query , ...req.header }
      }else if(req.files){
         filter = {...req.files , ...req.body , ...req.params , ...req.query , ...req.header }
      }else{
         filter = {...req.body , ...req.params , ...req.query , ...req.header }
      }

      // if(req.files){
      //    image = req.files.image[0]
      // }

      // if(req.files){
      //    image = req.files.images
      // }
      const{error} = schema.validate(filter , {abortEarly:false})

      if(!error) {
         next() ;
      }else{
         let errorList = [] ;

         error.details.forEach(ele => {
            errorList.push(ele.message)
         });
         next(new AppError(errorList , 401))
      }
   }
}