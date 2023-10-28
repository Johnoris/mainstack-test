import { $api } from "@/services";
import { useEffect, useState } from "react";

export interface IPaymentDetails {
    amount: string,
    date: string,
    payment_reference: string,
    status: string,
    type: string,
    metadata: {
        country: string,
        name: string,
        email: string,
        product_name: string,
        quantity: string,
        type: string,
    }
}
const useFetchAllTransactions = (): [ boolean, IPaymentDetails[] ] => {
    const [ transactions, setTransactions ] = useState<IPaymentDetails[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const fetchInfo = async() => {
        try{
            setIsLoading(true)
            const response = await $api.fetch('/transactions')
            if($api.isSuccessful(response)){
                setTransactions(response?.data)
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchInfo()
    },[])

    return[ isLoading, transactions ]
}
export default useFetchAllTransactions;