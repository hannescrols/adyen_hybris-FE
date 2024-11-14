import { NextApiRequest, NextApiResponse } from 'next'
import { Method } from 'axios'

import { decodeObjectValues } from '../../../../utils/encoding.utils'
import { getSAPClient } from "../../../../api/sap.axios";
import { getAuthToken } from 'utils/auth.utils'
interface Options {
  url: string
  method?: Method
  data?: { [key: string]: unknown }
  headers?: { [key: string]: string }
}

export default async function apiPaymentCouple(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const body = req.body || null
  const { path } = req.query
  const [endPath] = path
  const customer = { id: 'customer-id' }
  const accessToken = await getAuthToken()

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
      options.url = `paymentMethods`
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
    case 'couple': {
      options.url = `/payments`
      options.data = {
        ...body,
        storePaymentMethod: true,
        shopperStatement: 'Koppeling betaalmiddel',
        shopperReference: customer.id,
        merchantAccount: 'WEB',
        amount: {
          value: 0.0,
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
