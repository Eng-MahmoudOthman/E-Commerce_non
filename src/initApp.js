import { globalError } from "./middleWare/globalError.js";
import userRouter from "./modules/user/user.routes.js"
import authRouter from "./modules/authentication/auth.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js"
import brandRouter from "./modules/brand/brand.routes.js"
import productRouter from "./modules/product/product.routes.js"
import reviewRouter from "./modules/review/review.routes.js"
import wishListRouter from "./modules/wishList/wishList.routes.js"
import addressRouter from "./modules/address/address.routes.js"
import couponRouter from "./modules/coupon/coupon.routes.js"
import cartRouter from "./modules/cart/cart.routes.js"
import orderRouter from "./modules/order/order.routes.js"
import env from "dotenv"

env.config()


export const initApp = (app)=>{
   
   //^ User Routing :
   app.use("/api/v1/users" , userRouter) ;
   app.use("/api/v1/auth" , authRouter) ;
   app.use("/api/v1/categories" ,   categoryRouter) ;
   app.use("/api/v1/subCategories" ,   subCategoryRouter) ;
   app.use("/api/v1/brands" ,   brandRouter) ;
   app.use("/api/v1/products" ,   productRouter) ;
   app.use("/api/v1/reviews" ,   reviewRouter) ;
   app.use("/api/v1/wishList" ,   wishListRouter) ;
   app.use("/api/v1/addresses" ,   addressRouter) ;
   app.use("/api/v1/coupons" ,   couponRouter) ;
   app.use("/api/v1/carts" ,   cartRouter) ;
   app.use("/api/v1/orders" ,   orderRouter) ;





   //^ Express Middle Ware
   app.get('/*', (req, res) => res.json({message:'Not_Found_Page'}))





   //^ global Error Handling Middle Ware :
   app.use(globalError) ;
}