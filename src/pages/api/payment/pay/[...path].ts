import { NextApiRequest, NextApiResponse } from 'next'
import { Method } from 'axios'

import { decodeObjectValues } from '../../../../utils/encoding.utils'
import { ADYEN_MERCH_ACCOUNT, USER_ID } from "../../../../constants";
import { getSAPClient } from "../../../../api/sap.axios";
import { getAuthToken } from 'utils/auth.utils';
interface Options {
  url: string
  method?: Method
  data?: { [key: string]: unknown }
  headers?: { [key: string]: string }
}

export default async function apiPaymentPay(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const body = req.body || null
  const { path } = req.query
  const [cartId, endPath] = path
  const customer = { id: 'customer-id' }
  const accessToken = await getAuthToken()
  console.log('endPath', endPath)
  console.log('body', { body })

  const basePath = ``
  const options: Options = {
    url: '',
    method: req.method as Method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }
  switch (endPath) {
    case 'payment-methods':
      options.url = `/occ/v2/dlpo/users/${USER_ID}/carts/${cartId}/adyen/checkout-configuration`
      break
    case 'stored-payment-methods':
      options.url = `paymentMethods`
      options.data = {
        merchantAccount: 'WEB',
        shopperReference: customer.id,
      }
      break
    case 'additional-details': {
      options.url = `payments/details`
      options.data = { ...body }

      if (body?.browserInfo) {
        options.data.browserInfo = decodeObjectValues(body.browserInfo)
      }
      if (body?.paymentMethod) {
        options.data.paymentMethod = decodeObjectValues(body.paymentMethod)
      }

      break
    }
    case 'redirect':
      options.url = `payments/details`
      options.data = body
      break
    case 'payment': {
      options.url = `/occ/v2/dlpo/users/${USER_ID}/carts/${cartId}/adyen/place-order`
      options.data = {
        ...body,
        storePaymentMethod: true,
        shopperStatement: 'payment statement',
        shopperReference: customer.id,
        merchantAccount: ADYEN_MERCH_ACCOUNT,
        amount: {
          value: 10.0,
          currency: 'EUR',
        },
        browserInfo: decodeObjectValues(body.browserInfo),
        paymentMethod: decodeObjectValues(body.paymentMethod),
        returnUrl: body.returnUrl,
      }
      break
    }
    default:
      options.url = `${basePath}/${endPath}`
      options.data = body
  }
  console.log('url', options.url)
  console.log('data', options.data)
  const { data } = await getSAPClient()(options)
  res.json(data)
}
