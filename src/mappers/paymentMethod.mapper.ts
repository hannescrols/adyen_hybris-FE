import { PaymentMethodResponse, PaymentMethods } from "models/paymentMethod"

export const mapPaymentMethods = (paymentMethod: PaymentMethodResponse): PaymentMethods => {
    return {
        paymentMethods: paymentMethod.paymentMethods,
        storedPaymentMethods: paymentMethod.storedPaymentMethodList,
    }
}