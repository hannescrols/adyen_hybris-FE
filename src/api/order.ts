import axios from 'axios'

export async function createCart(): Promise<any> {
    try {
        const res = await axios.post('http://localhost:3000/api/order/createCart', {})
        return res.data
    } catch (error) {
        console.error('An error occurred in payments apiClient', { error })
    }
}

export async function addToCart(cartId: string): Promise<any> {
    try {
        const { data } = await axios.post('http://localhost:3000/api/order/addToCart', { cartId: cartId })
        return data
    } catch (error) {
        console.error('An error occurred in payments apiClient', { error })
    }
}

const api = { createCart: createCart, addToCart: addToCart }

export default api
