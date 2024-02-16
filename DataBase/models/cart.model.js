import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema(
   {
      user: {
         type: Types.ObjectId,
         ref: "user",
      },
      cartItems: [
         {
            product: {
               type: Types.ObjectId,
               ref: "product",
            },
            quantity: {
               type:Number ,
               default:1
            },
            price: Number,
         },
      ],
      totalPrice: Number,
      totalPriceAfterDiscount: Number,
      discount: Number,
   },{
      timestamps: true,
   }
); ;

// schema.pre(/^find/ , function(){
//    this.populate("user")
// })

export const cartModel = mongoose.model("cart" , schema) ;