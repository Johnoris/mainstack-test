import { $api } from "@/services";
import { useEffect, useState } from "react";

const useFetchUserInfo = (): [ boolean,string ] => {
    const [ initials, setInitials ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const fetchInfo = async() => {
        try{
            setIsLoading(true)
            const response = await $api.fetch('/user')
            if($api.isSuccessful(response)){
                setInitials(response?.data?.first_name.substring(0,1)+response?.data?.last_name.substring(0,1))
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

    return[ isLoading, initials ]
}
export default useFetchUserInfo;