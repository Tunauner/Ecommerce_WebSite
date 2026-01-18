import mongoose from "mongoose";    

const couponSchema = new mongoose.Schema({
    
    code: {
        type: String,
        required: [true, "Code is required"],
        unique: true,
    },
    discountPercentage: {
        type: Number,
        required: [true, "Discount is required"],
        max : [100, "Discount can not be more than 100%"],
        mim: [0, "Discount can not be less than 0%"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        unique: true,
    },
    expirationDate: {
        type: Date,
        required: [true, "Expiration date is required"],
    },

}, {
    timestamps: true
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
    
