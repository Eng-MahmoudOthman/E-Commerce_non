import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema(
   {
      user: {
         type: Types.ObjectId,
         ref: "user",
      },
      orderItems: [
         {
            product: {
               type: Types.ObjectId,
               ref: "product",
            },
            quantity:Number,
            price: Number,
         },
      ],
      totalOrderPrice: Number,

      shippingAddress :{
         street:String ,
         city:String ,
         phone:String ,
      },
      paymentType:{
         type:String ,
         enum:["cash" , "card"],
         default:"cash"
      },
      isDelivered:{
         type:Boolean ,
         default:false
      },
      deliveredAt: Date ,
      isPaid:{
         type:Boolean,
         default:false
      },
      paidAt:Date ,
      
   },{
      timestamps: true,
   }
); ;

// schema.pre(/^find/ , function(){
//    this.populate("user")
// })

export const orderModel = mongoose.model("order" , schema) ;