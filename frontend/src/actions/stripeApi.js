import axios from "axios"

export const getStripeApiKey = async () => {
    const {data} = await axios.get('/api/v1/stripeapikey')
    return data.stripeApiKey
}