import { cartModel } from "../../../DataBase/models/cart.model.js";
import { orderModel } from "../../../DataBase/models/order.model.js";
import { productModel } from "../../../DataBase/models/product.model.js";
import { AppError } from "../../utilities/AppError.js";
import { catchError } from "../../utilities/catchError.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);





//& Get All Orders :
export const getAllOrders = catchError(async (req, res, next) => {
   let orders = await orderModel.find().populate('orderItems.product');;
   if (!orders.length) return next(new AppError("Orders Not Exist", 404));

   res.json({ message: "success", orders });
});




//& Get All Orders :
export const getSpecificOrder = catchError(async (req, res, next) => {
   let order = await orderModel.findOne({user:req.user._id}).populate('orderItems.product');
   if (!order) return next(new AppError("order Not Exist", 404));

   res.json({ message: "success", order });
});




//& Add Item To order :
export const createCashOrder = catchError(async (req, res, next) => {
   //1- get Cart
   let cart = await cartModel.findById(req.params.id);
   if (!cart) return next(new AppError("Cart Not Exist in Data Base", 404));

   //2- total order price
   let totalOrderPrice = cart.totalPriceAfterDiscount
      ? cart.totalPriceAfterDiscount
      : cart.totalPrice;

   //3- create order cash
   const order = new orderModel({
      user: req.user._id,
      orderItems: cart.cartItems,
      totalOrderPrice: totalOrderPrice,
      shippingAddress: req.body.shippingAddress,
   });
   await order.save();

   //4- increment sold && decrement quantity
   let productId = cart.cartItems.map((item)=>{
      return (
         {
            updateOne:{
               "filter":{_id:item.product} ,
               "update":{$inc:{sold:item.quantity , quantity:-item.quantity}} ,
            }
         }
      )
   })
   await productModel.bulkWrite(productId) ;

   //5- clear cart
   await cartModel.findByIdAndDelete(req.params.id)


   res.json({ message: "success", order });
});






//& Add Item To order :
export const createCheckOutSession = catchError(async (req, res, next) => {

   //1- get Cart
   let cart = await cartModel.findById(req.params.id);
   if (!cart) return next(new AppError("Cart Not Exist in Data Base", 404));

   //2- total order price
   let totalOrderPrice = cart.totalPriceAfterDiscount
      ? cart.totalPriceAfterDiscount
      : cart.totalPrice;

   let session = await stripe.checkout.sessions.create({
      line_items:[
         {
            price_data:{
               currency:"egp" ,
               unit_amount: totalOrderPrice *100 ,
               product_data:{
                  name:req.user.name ,
                  // images:image Product
               } ,
            } ,
            quantity : 1
         }
      ] ,
      mode:'payment' ,
      success_url:"https://route-comm.netlify.app/#/" , //cancel order 
      cancel_url:"https://route-comm.netlify.app/#/cart", //success payment Url Front End
      customer_email:req.user.email ,  
      client_reference_id:req.params.id ,
      metadata:req.body.shippingAddress
   })
   res.json({message:"success" , session})
})





//& Add Item To order :
export const createOnlineOrder = catchError(async(request, response) => {
      const sig = request.headers['stripe-signature'].toString() ;
      
      let event;
      
      try {
         event = stripe.webhooks.constructEvent(request.body, sig, "whsec_FIbLtDMWZQqpXqE3YFuhElmMYMBBBYzX");
      } catch (err) {
         return response.status(400).send(`Webhook Error: ${err.message}`);
      }
      
      // Handle the event
      if(event.type == 'checkout.session.completed'){
         const checkoutSessionCompleted = event.data.object;
         console.log("Create Order Here");
      }else{
         console.log(`Unhandled event type ${event.type}`);
      }
   }
)
