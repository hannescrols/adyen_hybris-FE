import axios, { AxiosRequestConfig, Method } from 'axios';
import { mockPaymentMethodResponse } from '../../testData/paymentMethods';

interface ApiClientArgs {
  path: string
  action: string
  body?: AxiosRequestConfig['data']
  method?: Method
}

async function apiClient({
  path,
  body = {},
  action,
  method = 'POST',
}: ApiClientArgs) {
  try {
    const res = await axios({
      method,
      url: `/api/payment/${action}/${path}`,
      data: { ...body },
    })
    return res.data
  } catch (error) {
    console.error('An error occurred in payments apiClient', { error })
  }
}

// Payment API
export const paymentApi = {
  uuid: null as unknown as string | string[],
  async addOrder(order: any) {
    return apiClient({
      action: 'order',
      path: `create/`,
      body: order,
    })
  },
  async getPaymentMethods(cartId: string) {
    return mockPaymentMethodResponse
    /*return apiClient({
      action: 'pay',
      path: `${cartId}/payment-methods/`,
      method: 'GET',
    })*/
  },
  async postAdditionalDetails(payload: unknown) {
    return apiClient({
      action: 'pay',
      path: `${this.uuid}/additional-details/`,
      body: payload,
    })
  },
  async handleRedirect(payload: string | string[]) {
    return apiClient({
      action: 'pay',
      path: `${this.uuid}/redirect/`,
      body: {
        details: {
          redirectResult: payload,
        },
      },
    })
  },
  //@ts-ignore
  async postPayment(payload) {
    return apiClient({
      action: 'pay',
      path: `${this.uuid}/payment/`,
      body: {
        ...payload,
        channel: 'Web',
        origin: window.location.origin,
        additionalData: { allow3DS2: true },
        returnUrl: `${window.location.origin}resultpage/?order=${this.uuid}`,
      },
    })
  },
}

// Coupling API
export const couplingApi = {
  async getPaymentMethods() {

    return apiClient({
      action: 'couple',
      path: `payment-methods/`,
    })
  },
  async getStoredPaymentMethods() {
    return apiClient({
      action: 'couple',
      path: `stored-payment-methods/`,
    })
  },
  async postAdditionalDetails(payload: unknown) {
    return apiClient({
      action: 'couple',
      path: `additional-details/`,
      body: payload,
    })
  },
  async handleRedirect(payload: string | string[]) {
    return apiClient({
      action: 'couple',
      path: `redirect/`,
      body: {
        details: {
          redirectResult: payload,
        },
      },
    })
  },
  //@ts-ignore
  async postPayment(payload) {
    return apiClient({
      action: 'couple',
      path: 'couple/',
      body: {
        ...payload,
        channel: 'Web',
        origin: window.location.origin,
        additionalData: { allow3DS2: true },
        returnUrl: `${window.location.href.split('?')[0]
          }?link_payment_state=result`,
      },
    })
  },
  async deletePaymentMethod(
    storedPaymentMethodId: string,
  ): Promise<any> {
    return apiClient({
      action: 'couple',
      path: `decouple/${storedPaymentMethodId}/`,
      method: 'DELETE',
    })
  },
}

const api = {
  payment: paymentApi,
  coupling: couplingApi,
}

export default api
