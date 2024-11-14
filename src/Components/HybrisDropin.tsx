'use client'

import * as React from 'react'
import AdyenCheckout from '@adyen/adyen-web'

import '@adyen/adyen-web/dist/adyen.css'
import api from '../api/payment'
import { encodeObjectValues } from '../utils/encoding.utils'

type DropinType = 'payment' | 'coupling'
type BuildPhase = 'waiting' | 'progress' | 'completed'

export interface DropinProps {
  cartId: string
  type: DropinType
  translations?: {
    [key: string]: string
  }
}

export default function HybrisDropin({
  cartId,
  type,
  translations,
}: DropinProps): JSX.Element {
  const dropinContainerEl = React.useRef<HTMLDivElement | null>(null)
  const dropinRef = React.useRef<any | null>(null)
  const buildPhase = React.useRef<BuildPhase>('waiting')
  console.log('cartId', cartId)

  const handlePaymentResponseAction = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res: any, dropin: any) => {
      if (!res) {
        dropin.setStatus('loading')
        setTimeout(() => {
          dropin.setStatus('ready')
        }, 300)
        return
      }
      console.log('res', res)
      if (res?.paymentsAction) {
        dropin.handleAction(res.paymentsAction)
      } else {
        console.log('href')
        /*const { location } = window
        location.href =
          type === 'payment'
            ? `${location.origin}/tickets/?resultCode=${res.resultCode}`
            : `${location.href.split('?')[0]
            }?link_payment_state=result&resultCode=${res.resultCode}`*/
      }
    },
    [type],
  )

  const handleOnSubmit = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ data }: any, dropin: any) => {
      const payload = { ...data }
      if (payload.browserInfo) {
        payload.browserInfo = encodeObjectValues(payload.browserInfo)
      }
      if (payload.paymentMethod) {
        payload.paymentMethod = encodeObjectValues(payload.paymentMethod)
      }
      const res = await api[type].postPayment(cartId, payload)
      handlePaymentResponseAction(res, dropin)
    },
    [type, handlePaymentResponseAction],
  )

  const handleOnInitialized = React.useCallback(() => {
    console.log('onInitialized')
  }, [])

  const handleOnAdditionalDetails = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ data }: any, dropin: any) => {
      const payload = { ...data }

      if (payload.browserInfo) {
        payload.browserInfo = encodeObjectValues(payload.browserInfo)
      }
      if (payload.paymentMethod) {
        payload.paymentMethod = encodeObjectValues(payload.paymentMethod)
      }
      const res = await api[type].postAdditionalDetails(payload)
      handlePaymentResponseAction(res, dropin)
    },
    [type, handlePaymentResponseAction],
  )

  const createDropin = React.useCallback(
    async (config: any) => {
      const checkout = await AdyenCheckout(config)
      return checkout
        .create('dropin', {
          onReady: handleOnInitialized,
          showStoredPaymentMethods: type === 'payment',
        })
        .mount(dropinContainerEl.current as HTMLElement)
    },
    [handleOnInitialized, type],
  )

  const setupDropin = React.useCallback(async () => {

    dropinRef.current = await createDropin({
      locale: 'en',
      clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
      environment: process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT,
      onAdditionalDetails: handleOnAdditionalDetails,
      onSubmit: handleOnSubmit,
      paymentMethodsResponse: await api[type].getPaymentMethods(cartId),
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          name: 'creditcard',
        },
        bcmc: {
          hasHolderName: true,
          holderNameRequired: true,
          name: 'bancontact',
        },
        storedCard: { hideCVC: true },
      },
      translations: {
        ['en']: translations,
      },
    })
    buildPhase.current = 'completed'
  }, [
    type,
    createDropin,
    handleOnAdditionalDetails,
    handleOnSubmit,
    translations,
  ])

  React.useEffect(() => {
    if (buildPhase.current === 'waiting') {
      setupDropin()
    }
  }, [setupDropin])

  React.useEffect(() => () => dropinRef.current?.unmount(), [])

  return (
    <div className="mx-4 mb-10 rounded-xl bg-neutral-100 p-4 shadow sm:mx-0 sm:mb-14 sm:p-5 sm:pt-8">
      <div
        ref={dropinContainerEl}
        data-testid={
          type === 'payment' ? 'adyen-dropin-payment' : 'adyen-dropin-coupling'
        }
      />
    </div>
  )
}
