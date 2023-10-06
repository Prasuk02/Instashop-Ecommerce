const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res, next) => {
    try{
        // const total = req.query.total;

        // console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
      
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1000, // subunits of the currency
          currency: "usd",
        });
      
        // OK - Created
        response.status(201).send({
          clientSecret: paymentIntent.client_secret,
        });
    }
    catch(error){
        res
        .status(401)
        .json({ success: false, message: error });
    }
}

exports.sendStripeApiKey = async (req, res, next) => {
    try{
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    }
    catch(e){
        res
        .status(401)
        .json({ success: false, message: error.message });
    }
};