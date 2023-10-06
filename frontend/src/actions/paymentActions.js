import axios from "axios";

export const payWithStripe = async (paymentData) => {
  try {
    console.log("first called")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("PAYMENT DATA: ", paymentData)
    const { data } = await axios.post(
      "/api/v1/payment/process",
      paymentData,
      config
    );

    console.log("DATA FROM ACTION", data)
    return data;
  } catch (e) {
    return e.message;
  }
};

export const confirmPaymentWithStripe = async (
  stripe,
  client_secret,
  card,
  user,
  shippingInfo
) => {
  const paymentDetails = {
    payment_method: {
      card,
      billing_details: {
        name: user.name,
        email: user.email,
        address: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postal_code: shippingInfo.pinCode,
          country: shippingInfo.country,
        },
      },
    },
  };

  const result = await stripe.confirmCardPayment(client_secret, paymentDetails);
  return result
};
