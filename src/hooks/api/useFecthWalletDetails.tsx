import { $api } from "@/services";
import { useEffect, useState } from "react";

interface IWalletDetails{ 
    balance: number, 
    ledger_balance: number, 
    pending_payout: number, 
    total_payout: number, 
    total_revenue: number 
}

const useFetchWalletDetails = (): [ boolean, IWalletDetails ] => {
    const [ walletDetails, setWalletDetails ] = useState<IWalletDetails>({ balance: 0, ledger_balance: 0, pending_payout: 0, total_payout: 0, total_revenue: 0 });
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const fetchWalletDetails = async() => {
        try{
            setIsLoading(true)
            const response = await $api.fetch('/wallet')
            if($api.isSuccessful(response)){
                setWalletDetails(response?.data)
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
        fetchWalletDetails()
    },[])

    return[ isLoading, walletDetails ]
}
export default useFetchWalletDetails;