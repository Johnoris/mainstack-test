/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const baseURL = process.env.VITE_APP_API_URL;


const axiosConfig = {
	withCredentials: false,
	headers: {
		Accept: 'application/json'
	}
}

const axiosClient:AxiosInstance = axios.create(axiosConfig);

class ServiceApi {
	public url = baseURL;

	appendToURL(url: string) {
		return `${this.url}${url}`;
	}

	setupHeaders(){
		return {
			headers: {
				"Content-Type": "application/json",
			},
		};
	}


	async fetch (url: string) {
		try{
			const response = await axiosClient.get(
				this.appendToURL(url),
				this.setupHeaders(),
			)
			return response
		}
		catch(err:any){
			return err
		}
	}

	async post (url: string, data: any) {
		try{
			const response = await axiosClient.post(
				this.appendToURL(url), data, this.setupHeaders()
			)
			return response
		}
		catch(err:any){
			return err
		}
	}

	async update (url: string, data: any) {
		try{
			const response = await axiosClient.put(
				this.appendToURL(url), data, this.setupHeaders()
			)
			return response
		}
		catch(err:any){
			return err
		}
	}
	
	isSuccessful(response: any): boolean {
		const codes = [200, 201, 202, 204];
		const validationErrorCodes = [ 422, 400 ]
		if(!codes.includes(response?.response?.status || response?.response?.statusCode || response?.response?.code )){
            if (validationErrorCodes.includes(response?.response?.status)){
				toast.error(response?.response?.data?.message)
            }
            else if(response?.response?.status === 500){
                toast.error("server Error")
            }
		}
		return !response?.data?.errors && codes.includes(
		  response?.status || response?.statusCode || response?.code 
		)
		  ? true
		  : false;
	}
}
// eslint-disable-next-line 
export default new ServiceApi();