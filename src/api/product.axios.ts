import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ConfidentialClientApplication } from '@azure/msal-node'
import { HttpsAgent, HttpsOptions } from 'agentkeepalive'
import https from 'https'

type AgentType = https.Agent | HttpsAgent

let productClient: AxiosInstance

export function createProductClient(): AxiosInstance {
  return createInstance({
    baseURL: "https://api-d.delijn.be/divb-api-gateway-customer/v1",
  })
}

export function getProductClient(): AxiosInstance {
  if (productClient) {
    return productClient
  }

  productClient = createProductClient()
  return productClient
}

function createInstance(
    axiosConfig: AxiosRequestConfig = { baseURL: '' },
    agentOptions?: HttpsOptions,
  ): AxiosInstance {
    axiosConfig.timeout = axiosConfig.timeout || 19_000
    axiosConfig.httpsAgent = createAgent(agentOptions)
    return axios.create(axiosConfig)
  }

  function createAgent({
    ...otherOptions
  }: HttpsOptions = {}): AgentType {  
    return new https.Agent(otherOptions)
  }

  export async function getDivbAccessToken() {
    const ccaConfig = {
      auth: {
        clientId: 'd3d29988-bbec-45e6-a843-644585453e69',
        authority: `https://login.microsoftonline.com/488b6c64-b0da-4b62-8bbd-8bbb63b5eb77`,
        clientSecret: '_kk8Q~WYwbNG2Ioz6LOMVK9-zzTlBlc1b8zmmade',
      },
    }
    const cca = new ConfidentialClientApplication(ccaConfig)
  
    const result = await cca.acquireTokenByClientCredential({
      scopes: ['api://ardelijn-d-app-divb-api-gateway-customer/.default'],
    })
  
    return result?.accessToken
  }
