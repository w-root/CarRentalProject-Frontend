export interface Payment{
    customerId:number,
    cardNumber: string,
    cardHolder: string,
    expMonth: number,
    expYear: number,
    cvc: string
}