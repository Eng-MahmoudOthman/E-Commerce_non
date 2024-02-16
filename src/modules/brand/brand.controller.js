
import {brandModel} from "../../../DataBase/models/brand.model.js"
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import slugify from "slugify";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";


//& Get All Brand :
export const getAllBrand= catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(brandModel.find(), req.query ).pagination().fields().search().filter().sort();
      const brands = await apiFeature.mongooseQuery ;
      if(!brands.length) return next(new AppError("brands is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  brands})
   }
)


//& Get Single Brand:
export const getSingleBrandById = catchError(
   async(req , res , next)=>{
      const brand = await brandModel.findById(req.params?.id) ;

      !brand && next(new AppError("Not Found Brand" , 404))
      brand && res.json({message:"success" , brand})
   }
)


//& Add New Brand:
export const addBrand= catchError(
   async(req , res , next)=>{
      const {name } = req.body ;
      // const {_id} = req.user ;

      //& Check On Brand Name Is Present Or Not :
      const brandExist = await brandModel.findOne({name}) ;
      if(brandExist){
         return next(new AppError("Name Already Exist" , 402))
      }

      //& Check On Size File Media Before Convert From k-byte to Mega byte :
      if(req.file){
         console.log( req.file.size);
         // req.file.size = req.file.size / 1024 ;
         if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
            return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
         }
         const logo = req.file.filename ;
         req.body.logo = logo ;
      }


      // console.log(req.file.size);

      //& production the Slug :
      // const slug = name.toLocaleLowerCase().replaceAll(" " , "-")
      const slug = slugify(name)

      //& Insert New Brand in Data Base :
      req.body.slug = slug ;
      // req.body.createdBy = _id ;

      const brand = new brandModel(req.body) ;

      await brand.save() ;
      //& Get All Brandies :
      const brandies = await brandModel.find();

      res.json({message:"success" , NewBrand:brand, all_Brandies:brandies})
   }
)


//& Update Brand By Id :
export const updateBrandById = catchError(
   async(req , res , next)=>{
      const{name} = req.body ;
      const{id} = req.params ;

      //& production the Slug :
      // const slug = name.toLocaleLowerCase().replaceAll(" " , "-")
      const slug = slugify(name) ;

      if(req.file){
         // req.file.size = req.file.size / 1024 ;
         if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
            console.log(req.file);
            return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
         }
         const logo = req.file.filename ;
         req.body.logo = logo ;
      }
      req.body.slug = slug ;
      console.log(req.file);

      //& Check On Size File Media Before Convert From k-byte to Mega byte :


      const brand = await brandModel.findByIdAndUpdate(id , req.body , {new:true}) ;
      const brandies = await brandModel.find();

      !brand &&  next(new AppError("Not Found Brand" , 404))
      brand && res.json({message:"success" , updateBrand:brand, all_Brandies:brandies})
   }
)



//& Delete Brand By Id :
export const deleteBrandId = deleteOne(brandModel , "Brand" , "Brandies")


















