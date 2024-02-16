
import {subcategoryModel} from "../../../DataBase/models/subCategory.model.js"
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import slugify from "slugify";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";


//& Get All SubCategories :
export const getAllSubCategory = catchError(
   async(req , res , next)=>{
      let filterObj = {};
         if(req.params.category){
         filterObj.category = req.params.category
      }

      let apiFeature = new ApiFeature(subcategoryModel.find(filterObj), req.query ).pagination().fields().search().filter().sort();
      const subCategories = await apiFeature.mongooseQuery;
      // const subCategories = await apiFeature.mongooseQuery.populate("category");
      if(!subCategories.length) return next(new AppError("subCategories is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  subCategories})
   }
)


//& Get Single SubCategory :
export const getSingleSubCategoryById = catchError(
   async(req , res , next)=>{
      const subCategory = await subcategoryModel.findById(req.params?.id) ;

      !subCategory && next(new AppError("Not Found SubCategory" , 404))
      subCategory && res.json({message:"success" , subCategory})
   }
)


//& Add New SubCategory :
export const addSubCategory = catchError(
   async(req , res , next)=>{
      const {name , category } = req.body ;
      // const {_id} = req.user ;

      //& Check On SubCategory Name Is Present Or Not :
      const subCategoryExist = await subcategoryModel.findOne({name}) ;
      if(subCategoryExist){
         return next(new AppError("Name Already Exist" , 402))
      }

      // console.log(req.file.size);

      //& production the Slug :
      // const slug = name.toLocaleLowerCase().replaceAll(" " , "-")
      const slug = slugify(name)

      //& Insert New Category in Data Base :
      req.body.slug = slug ;
      req.body.category = category ;
      // req.body.createdBy = _id ;

      const subCategory = new subcategoryModel(req.body) ;

      await subCategory.save() ;
      //& Get All SubCategories :
      const subCategories = await subcategoryModel.find();

      res.json({message:"success" , NewSubCategory:subCategory , all_SubCategories:subCategories})
   }
)


//& Update SubCategory By Id :
export const updateSubCategoryById = catchError(
   async(req , res , next)=>{
      const{name} = req.body ;
      const{id} = req.params ;

      //& production the Slug :
      // const slug = name.toLocaleLowerCase().replaceAll(" " , "-")
      const slug = slugify(name) ;

      req.body.slug = slug ;

      const subCategory = await subcategoryModel.findByIdAndUpdate(id , req.body , {new:true}) ;
      const subCategories = await subcategoryModel.find();

      !subCategory &&  next(new AppError("Not Found SubCategory" , 404))
      subCategory && res.json({message:"success" , updateSubCategory:subCategory , all_SubCategories:subCategories})
   }
)


//& Delete SubCategory By Id :
export const deleteSubCategoryId = deleteOne(subcategoryModel , "SubCategory" , "SubCategories")














