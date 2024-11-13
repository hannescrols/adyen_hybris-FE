import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HttpsAgent, HttpsOptions } from 'agentkeepalive'
import https from 'https'

type AgentType = https.Agent | HttpsAgent

let sapClient: AxiosInstance

export function createSAPClient(): AxiosInstance {
  console.log('process.env.API_BASE_URL', process.env.API_BASE_URL)
  return createInstance({
    baseURL: `${process.env.API_BASE_URL}/`,
  })
}

export function getSAPClient(): AxiosInstance {
  if (sapClient) {
    return sapClient
  }

  sapClient = createSAPClient()
  return sapClient
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
