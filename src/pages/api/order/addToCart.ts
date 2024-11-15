import { NextApiRequest, NextApiResponse } from "next";

import { getSAPClient } from "../../../api/sap.axios";
import { getAuthToken } from "../../../utils/auth.utils";
import { USER_ID } from "../../../constants";


export default async function apiCartCreate(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const { cartId } = req.body
    const sapClient = await getSAPClient()
    const accessToken = await getAuthToken()
    try {
        const response = await sapClient.post(
            `occ/v2/dlpo/users/${USER_ID}/carts/${cartId}/entries`,
            {
                "quantity": 1,
                "product": {
                    "code": "000000000000003100"
                },
                "traveller": {
                    "uid": "{{user_id}}"
                },
                "productCharacteristics": [
                    {
                        "code": "CS_MOBIB_REASON_CODE",
                        "value": "CS_MOBIB_REASON_CODE_1"
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )
        res.json(response.data)
    }
    catch (error) {
        console.log('API ERROR', error)
        throw error
    }
}