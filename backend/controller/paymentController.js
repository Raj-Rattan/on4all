const Razorpay = require('razorpay');
const ApiResponse = require('../utils/ApiResponse');


var instance = new Razorpay({
    key_id: "rzp_test_juizRynjJdW7yE",
    key_secret: "5lvXOfb6gk4u8nySc5DxMXpa",
});

const checkout = async (req, res) => {
    const { amount } = req.body;
    const option = {
        amount: amount * 100,
        currency: "INR"
    }
    const order = await instance.orders.create(option);

    return res.status(200).json(
        new ApiResponse(
            200,
            { success: true, order },
            "Order created successfully",
        )
    )
}

const paymentVerification = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId } = req.body;

    return res.status(200).json(
        new ApiResponse(
            200,
            { razorpayOrderId, razorpayPaymentId, },
            "Payment verified successfully",
        )
    )
}

module.exports = {
    checkout,
    paymentVerification
}