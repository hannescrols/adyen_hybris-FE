export interface Issuer {
    id: string
    name: string
}

export interface PaymentMethodFrom {
    name: string
    type: string
    brands?: string[]
    Issuers?: Issuer[]
}

export interface StoredPaymentMethod {
    brand: string
    name: string
    type: string
    expiryMonth: string
    expiryYear: string
    holderName: string
    id: string
    lastFour: string
    networkTxReference: string
    supportedRecurringProcessingModels: string[]
    supportedShopperInteractions: string[]
    Issuers?: Issuer[]
}

export interface PaymentMethodResponse {
    paymentMethods: PaymentMethodFrom[]
    storedPaymentMethodList: StoredPaymentMethod[]
}

export interface PaymentMethods {
    paymentMethods: PaymentMethodFrom[]
    storedPaymentMethods: StoredPaymentMethod[]
}