import * as React from 'react'

import HybrisDropin from 'Components/HybrisDropin'

import orderApi from "../api/order";

export default function HomePage({ cartId, addResponse }: { cartId: string, addResponse: any }) {
    const [showDropin, setShowDropin] = React.useState(false)

    if (!showDropin) {
        return <button onClick={() => setShowDropin(true)}>Show Dropin</button>
    }
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
            cartId: cartId.code,
            addResponse,

        }
    }
}
