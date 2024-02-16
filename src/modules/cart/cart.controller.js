
import { cartModel } from "../../../DataBase/models/cart.model.js";
import { couponModel } from "../../../DataBase/models/coupon.model.js";
import { productModel } from "../../../DataBase/models/product.model.js";
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";


//& Function Calculate Total Price :
let totalPriceCalc = (cart)=>{
   let totalPrice = 0 ;
   cart.cartItems.forEach((item)=>{
      totalPrice +=  item.quantity * item.price ; 
   })
   cart.totalPrice = totalPrice
   
   //!Calculate Total Price After Discount in Coupon :
   if(cart.discount){
      let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100 ;
      cart.totalPriceAfterDiscount = totalPriceAfterDiscount 
   }
}


//& Add Item To Cart :
export const addCart = catchError(
   async(req , res , next)=>{
      const{ product , quantity}  =req.body ;

      let productExist = await productModel.findById(product) ;
      if(!productExist) return next(new AppError("Product Not Exist in Data Base" , 404)) ;

      if(quantity > productExist.quantity){
         return next(new AppError("Quantity Sold Out" , 404)) ;
      }

      let cartExist = await cartModel.findOne({user:req.user._id}) ;

      if(!cartExist){
         const cart = new cartModel({
            user:req.user._id ,
            cartItems:[{
               product:product ,
               quantity:quantity ,
               price: productExist.price
            }] ,
         });
         totalPriceCalc(cart)
         await cart.save() ;
         !cart && next(new AppError("Cart Not Exist" , 404)) ;
         cart && res.json({message:"success" , cart}) ;
      }else{
         let item = cartExist.cartItems.find((item)=>{
            return item.product == product
         })

         if(item){
            if((item.quantity + quantity) > productExist.quantity) return next(new AppError("Sold Out")) // Error
            item.quantity += quantity || 1
            totalPriceCalc(cartExist)
         }else{
            cartExist.cartItems.push({
               product:product ,
               quantity:quantity ,
               price: productExist.price
            })
            totalPriceCalc(cartExist)
         }
         await cartExist.save() ;
         res.json({message:"success" , cartExist}) ;
      }
   }
)



//& Get Logged User to Cart :
export const getLoggedUserCart = catchError(
   async(req , res , next)=>{
      const cart = await cartModel.findOne({user:req.user._id})
      !cart &&  next(new AppError("this User Not Added cart Or Not Found cart" , 404))
      cart && res.json({message:"success" , cart})
   }
)



//& Update Quantity :
export const updateQuantity = catchError(
   async(req , res , next)=>{
      const cart = await cartModel.findOne({user:req.user._id})
      !cart &&  next(new AppError("Cart Not Found" , 404))

      let item = cart.cartItems.find((item)=>{
         return item._id.toString() == req.params.id.toString()
      })
      if(!item) next(new AppError("Item Not Found" , 404)) ;

      const product = await productModel.findById(item.product)
      !product &&  next(new AppError("Product Not Found" , 404))


      if(req.body.quantity > product.quantity ) return next(new AppError(`Product Sold Out And Quantity = [${product.quantity}]` , 404))

      item.quantity = req.body.quantity 

      totalPriceCalc(cart)
      await cart.save();
      cart && res.json({message:"success" , cart})
   }
)



//& remove item To Cart :
export const removeItemToCart = catchError(
   async(req , res , next)=>{
      const cart = await cartModel.findOneAndUpdate({user:req.user._id} , {$pull:{cartItems:{_id:req.params.id}}} , {new:true})
      totalPriceCalc(cart)
      await cart.save();
      !cart &&  next(new AppError("this User Not Added cart Or Not Found cart" , 404))
      cart && res.json({message:"success" , cart})
   }
)



//& Clear User To Cart :
export const ClearUserToCart = catchError(
   async(req , res , next)=>{
      const cart = await cartModel.findOneAndDelete({user:req.user._id} , {new:true})
      !cart &&  next(new AppError("Cart Not Found" , 404))
      cart && res.json({message:"success" , cart})
   }
)



//& Apply Coupon :
export const applyCoupon = catchError(
   async(req , res , next)=>{
      //!Check Exist Cart :
      const cart = await cartModel.findOne({user:req.user._id}) ;
      if(!cart) return next(new AppError("Cart Not Found" , 404));

      //!Check Exist Coupon :
      const coupon = await couponModel.findOne({code:req.body.coupon , expired:{$gte:Date.now()}}) ;
      if(!coupon) return next(new AppError("Invalid Coupon" , 401));

      // //!Check Expired Date Coupon :
      // if(!(coupon.expired >= Date.now())) return next(new AppError("Coupon is Expired" , 404));

      let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100 ;
      cart.totalPriceAfterDiscount = totalPriceAfterDiscount 
      cart.discount = coupon.discount
      totalPriceCalc(cart)
      await cart.save();

      res.json({message:"success" , cart})
   }
)
