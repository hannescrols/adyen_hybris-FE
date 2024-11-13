export const testPaymentMethods = {
    "paymentMethods": [
        {
            "brands": [
                "bcmc",
                "maestro",
                "mc",
                "visa"
            ],
            "name": "Bancontact card",
            "type": "bcmc"
        },
        {
            "name": "Payconiq by Bancontact",
            "type": "bcmc_mobile"
        },
        {
            "issuers": [
                {
                    "id": "1164",
                    "name": "SNS"
                },
                {
                    "id": "1121",
                    "name": "Test Issuer"
                },
                {
                    "id": "1154",
                    "name": "Test Issuer 5"
                },
                {
                    "id": "1165",
                    "name": "iDeal Test Issuer"
                },
                {
                    "id": "1153",
                    "name": "Test Issuer 4"
                },
                {
                    "id": "1152",
                    "name": "Test Issuer 3"
                },
                {
                    "id": "1163",
                    "name": "Ideal bridge test issuer"
                },
                {
                    "id": "1151",
                    "name": "Test Issuer 2"
                },
                {
                    "id": "1162",
                    "name": "Test Issuer Cancelled"
                },
                {
                    "id": "1161",
                    "name": "Test Issuer Pending"
                },
                {
                    "id": "1160",
                    "name": "Test Issuer Refused"
                },
                {
                    "id": "1159",
                    "name": "Test Issuer 10"
                },
                {
                    "id": "1158",
                    "name": "Test Issuer 9"
                },
                {
                    "id": "1157",
                    "name": "Test Issuer 8"
                },
                {
                    "id": "1156",
                    "name": "Test Issuer 7"
                },
                {
                    "id": "1155",
                    "name": "Test Issuer 6"
                }
            ],
            "name": "iDEAL",
            "type": "ideal"
        },
        {
            "brands": [
                "bcmc",
                "maestro",
                "mc",
                "visa"
            ],
            "name": "Cards",
            "type": "scheme"
        }
    ],
    "storedPaymentMethods": [
        {
            "brand": "visa",
            "expiryMonth": "03",
            "expiryYear": "30",
            "holderName": "test",
            "id": "Ln50idTSeDRj3ytd40fjfNcJ",
            "lastFour": "1142",
            "name": "VISA",
            "networkTxReference": "237068696703163",
            "supportedRecurringProcessingModels": [
                "CardOnFile",
                "Subscription",
                "UnscheduledCardOnFile"
            ],
            "supportedShopperInteractions": [
                "Ecommerce",
                "ContAuth"
            ],
            "type": "scheme"
        },
        {
            "brand": "bcmc",
            "expiryMonth": "03",
            "expiryYear": "30",
            "holderName": "test",
            "id": "mzhYOLPdelSAZi3Sf1vtMoGi",
            "lastFour": "9990",
            "name": "Bancontact card",
            "networkTxReference": "QY6YIS73509250925",
            "supportedRecurringProcessingModels": [
                "CardOnFile"
            ],
            "supportedShopperInteractions": [
                "Ecommerce"
            ],
            "type": "scheme"
        }
    ]
}
