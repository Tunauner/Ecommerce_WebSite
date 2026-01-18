import Coupon from "../models/Coupon.model.js";

export const getCoupon = async (req, res) => {
    try {
        const user = req.user;
        const coupon = await Coupon.findOne({userId:user._id, isActive:true});

        return res.json(coupon || null); 
    } catch (error) {
        console.log("Error in getCoupon controller",error.message);
        return res.status(500).json({message:"Server error"});
    }

}

export const validateCoupon = async (req, res) => {
    
    try {
        const {code} = req.body; //bodyden cektık mesela adam ınputa gırıcek kodunu oyuzden body den aldık 
        const user = req.user;
        const coupon = await Coupon.findOne({code:code, isActive:true, userId:user._id});

        if(!coupon) {
            return res.status(404).json({message:"Coupon not found"});
        }

        if(coupon.expirationDate < Date.now()) {

            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({message:"Coupon expired"});
            
        }

        return res.json({
            message:"Coupon valid",
            discountPercentage:coupon.discountPercentage,
            code:coupon.code,
        });

    } catch (error) {
        console.log("Error in validateCoupon controller",error.message);
        return res.status(500).json({message:"Server error"});
    }
}