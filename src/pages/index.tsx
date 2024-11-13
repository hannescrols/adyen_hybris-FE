import React from 'react'

import HybrisDropin from 'Components/HybrisDropin'

import orderApi from "../api/order";

export default function HomePage({ cartId, addResponse }: { cartId: string, addResponse: any }) {
    console.log('create cart response ', { cartId })
    console.log('add to cart  response ', { addResponse })

    return (
        <div className='w-full max-w-[800px] mx-20'>
            <div className='my-8'><h1>Home Page</h1></div>
            <HybrisDropin type="payment" cartId={cartId} />
        </div>
    )
}

export async function getServerSideProps() {
    const cartId = await orderApi.createCart()
    const addResponse = await orderApi.addToCart(cartId)
    return {
        props: {
            cartId:cartId.code,
            addResponse,

        }
    }
}
