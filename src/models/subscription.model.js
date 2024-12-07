

import mongoose, { Schema } from "mongoose";


const subscriptionSchema =  new Schema ({
    subscriber:{
        type: Schema.Types.ObjectId, // => one who is being Subscribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

export const Subscription = mongoose.model("Subcription", subscriptionSchema)