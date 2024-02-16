
import {productModel} from "../../../DataBase/models/product.model.js"
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import slugify from "slugify";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utilities/apiFeatures.js";

/*

1- pagination 
2- filter
3- sort
4- search
5- select Fields

*/

//& Get All Products :
export const getAllProduct = catchError(
   async(req , res , next)=>{
      let apiFeature = new ApiFeature(productModel.find(), req.query ).pagination().fields().search().filter().sort();

      // let apiFeature = new ApiFeature(productModel.find(), req.query );
      // apiFeature.pagination().fields().search().filter().sort()
      
      const products = await apiFeature.mongooseQuery ;
      if(!products.length) return next(new AppError("Products is Empty" , 404))
      res.json({message:"success" ,page:apiFeature.pageNumber ,  products})
   }
)





// //& Get All Products :
// export const getAllProduct = catchError(
//    async(req , res , next)=>{

//       //==============Pagination==================
//          //! 1 - query Negative Number 
//          if(req.query.page <= 0) req.query.page = 1
//          //! 2 - query Undefined 
//          //! 3 - query Enter string
//       let pageNumber = (req.query.page * 1) || 1 ;
//       // pageNumber = Math.abs(pageNumber) 
//       // console.log(Math.abs(pageNumber) );
//       let limit = 2 ;
//       let skip = (pageNumber - 1) * limit
      

//       //==============filter==================
//       let filterObj = {...req.query} ;

//       //& Handle Delete Any KeyWord In Url :
//       let excludedFields  = ["page" , "fields" , "sort" , "keyword"] ;
//       excludedFields.forEach((ele)=>{
//          delete filterObj[ele]
//       })
//       filterObj = JSON.stringify(filterObj)
//       filterObj = filterObj.replace(/(gte|gt|lte|lt)/g , (match)=>{
//          console.log(match);
//          return "$" + match ;
//       })
//       filterObj = JSON.parse(filterObj)
//       console.log("filterObjFinal",filterObj);



//       //==============sort==================
//       const mongooseQuery =  productModel.find(filterObj).skip(skip).limit(limit);
//       // const mongooseQuery =  productModel.find({price:{$gt:100}}).skip(skip).limit(limit);
//       if(req.query.sort){
//          let sortBy = req.query.sort.split(",").join(" ") ;
//          mongooseQuery.sort(sortBy)
//          // mongooseQuery.populate("category subcategory brand" );
//          // console.log(sortBy);
//       }


//       //==============select fields==================
//       if(req.query.fields){
//          let fields = req.query.fields.split(",").join(" ") ;
//          mongooseQuery.select(fields)
//          // mongooseQuery.populate("category subcategory brand" );
//          // console.log(fields);
//       }


//       //==============search keyword==================
//       if(req.query.keyword) {
//          mongooseQuery.find({
//             $or:[
//                {title:{$regex:req.query.keyword}} ,
//                {description:{$regex:req.query.keyword}} ,
//             ]
//          })
//       }
      


//       const products = await mongooseQuery ;
//       if(!products.length) return next(new AppError("Products is Empty" , 404))
//       res.json({message:"success" ,page:pageNumber ,  products})
//    }
// )



//& Get Single Product :
export const getSingleProductById = catchError(
   async(req , res , next)=>{
      const product = await productModel.findById(req.params?.id) ;

      !product && next(new AppError("Not Found Product" , 404))
      product && res.json({message:"success" , product})
   }
)


//& Add New Product :
export const addProduct = catchError(
   async(req , res , next)=>{
      // const {_id} = req.user ;

      //& Check On Product Name Is Present Or Not :
      const productExist = await productModel.findOne({title:req.body.title}) ;
      if(productExist){
         return next(new AppError("Name Already Exist" , 402))
      }

      //& File Uploads :
      if(req.files){
         //&Check On Size In Images Fields And Add Image :
         if(req.files.imgCover){
            const size = req.files.imgCover[0].size ;
            if((size > +process.env.UPLOAD_IMAGE_SIZE)){
               return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
            }
            const imgCover = req.files.imgCover[0].filename ;
            req.body.imgCover = imgCover ;
         }
         //&Check On Size In Images Fields And Add Image :
         if(req.files.images){
            req.body.images = req.files.images.map((ele)=>{
               if(ele.size > +process.env.UPLOAD_IMAGE_SIZE){
                  return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
               }
               return ele.filename
            }) ;
         }
      }

      //& Check On Size File Media Before Convert From k-byte to Mega byte :
      // if(req.files){
      //    console.log( req.file.size);
      //    // req.file.size = req.file.size / 1024 ;
      //    // if((req.file.size > +process.env.UPLOAD_IMAGE_SIZE)){
      //    //    return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
      //    // }
      //    const imgCover = req.files.imgCover[0].filename ;
      //    req.body.imgCover = imgCover ;
      //    req.body.images = req.files.images.map((ele)=>{
      //       return ele.filename
      //    }) ;
      // }



      //& Production the Slug :
      // const slug = name.toLocaleLowerCase().replaceAll(" " , "-")
      const slug = slugify(req.body.title)

      //& Insert New Product in Data Base :
      req.body.slug = slug ;
      // req.body.createdBy = _id ;

      const product = new productModel(req.body) ;

      await product.save() ;
      //& Get All Products :
      const products = await productModel.find();

      res.json({message:"success" , NewProduct:product , all_Products:products})
   }
)


//& Update Product By Id :
export const updateProductById = catchError(
   async(req , res , next)=>{
      const{id} = req.params ;

      //& Production the Slug :
      // const slug = name.toLocaleLowerCase().replaceAll(" " , "-")
      const slug = slugify(req.body.title) ;

      if(req.files){
         //&Check On Size In Images Fields And Add Image :
         if(req.files.imgCover){
            const size = req.files.imgCover[0].size ;
            if((size > +process.env.UPLOAD_IMAGE_SIZE)){
               return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
            }
            const imgCover = req.files.imgCover[0].filename ;
            req.body.imgCover = imgCover ;
         }
         //&Check On Size In Images Fields And Add Image :
         if(req.files.images){
            req.body.images = req.files.images.map((ele)=>{
               if(ele.size > +process.env.UPLOAD_IMAGE_SIZE){
                  return next(new AppError("Size Media Should be Less than 200 k-Byte" , 404))
               }
               return ele.filename
            }) ;
         }
      }

      req.body.slug = slug ;
      const product = await productModel.findByIdAndUpdate(id , req.body , {new:true}) ;
      const products = await productModel.find();

      //&Check Found Product :
      !product &&  next(new AppError("Not Found Product" , 404))
      product && res.json({message:"success" , updateProduct:product , all_Products:products})
   }
)


//& Delete Product By Id :
export const deleteProductId = deleteOne(productModel , "Product" , "Products")





