import { NextApiRequest, NextApiResponse } from "next";

import { getSAPClient } from "../../../api/sap.axios";
import { getAuthToken } from "../../../utils/auth.utils";
import { USER_ID } from "../../../constants";


export default async function apiCartCreate(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    console.log('start')
    const sapClient = await getSAPClient()
    
    const accessToken = await getAuthToken()
    
    try {
        const response = await sapClient.post(`/occ/v2/dlpo/users/${USER_ID}/carts`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },)
        res.json(response.data)
    }
    catch (error) {
        console.log('API ERROR', error)
        throw error
    }
}