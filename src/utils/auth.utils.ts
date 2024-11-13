'use server'

import { getSAPClient } from "../api/sap.axios";

export async function getAuthToken(
): Promise<string> {
    const sapClient = getSAPClient()
    const urlEncodedData = new URLSearchParams()
    urlEncodedData.append('grant_type', 'client_credentials')
    urlEncodedData.append('client_id', 'bffCommConnectivityUser')
    urlEncodedData.append('client_secret', 'h[abt083|nv9[')
    const authResponse = await sapClient.post('/authorizationserver/oauth/token', {}, {})
    console.log('authResponse', authResponse)
    return authResponse.data.access_token
}