/* eslint-disable @typescript-eslint/no-explicit-any */
import { CLOSE_ICON } from "@/assets/icons/icons";
import { Dispatch, RefObject, SetStateAction } from "react";
import CustomSelectInput from "../form-comps/customSelectInput";
import DateFilter from "./dateFilter";
import { DateObject } from "react-multi-date-picker";

const Filter = ({ filterActive, setFilterActive, reference, startDate, setStartDate, endDate, setEndDate, clearFilters, selectedTransactionTypes, setSelectedTransactionTypes, selectedTransactionStatus, setSelectedTransactionStatus, setDateFilterInfo, setStatusFilterInfo, setTypeFilterInfo}: { 
    filterActive: boolean,
    setFilterActive: Dispatch<SetStateAction<boolean>>,
    reference: RefObject<HTMLDivElement> | null,
    startDate: DateObject | DateObject[] | null | any,
    endDate: DateObject | DateObject[] | null | any,
    setStartDate: Dispatch<SetStateAction<DateObject | DateObject[] | null | any>>,
    setEndDate: Dispatch<SetStateAction<DateObject | DateObject[] | null | any>>,
    selectedTransactionTypes: string[],
    setSelectedTransactionTypes: Dispatch<SetStateAction<string[]>>,
    selectedTransactionStatus: string[],
    setSelectedTransactionStatus: Dispatch<SetStateAction<string[]>>,
    clearFilters: () => void,
    setDateFilterInfo: Dispatch<SetStateAction<{
        dateActive?: boolean,
        dateUpperLimit?: DateObject | DateObject[] | null | any,
        dateLowerLimit?: DateObject | DateObject[] | null | any,
    }>>,
    setTypeFilterInfo: Dispatch<SetStateAction<{
        typeActive?: boolean,
        typeArray?: string[],
    }>>,
    setStatusFilterInfo: Dispatch<SetStateAction<{
        statusActive?: boolean,
        statusArray?: string[]
    }>>,
}) => {


    
    return(
        <div className={`flex items-end justify-end h-[100dvh] w-screen fixed top-0 left-0 p-8 z-40 bg-[rgba(0,0,0,0.5)] ${ !filterActive && '!left-[100vw]' }`} data-testid="filter-modal">
            <div className="shadow-thickShadow backdrop max-w-[456px] w-full rounded-[20px] flex flex-col justify-between bg-white h-[80dvh] max-h-[876px]" ref={reference} >
                <div>
                    <div className="flex justify-between items-center py-5 px-[22px]">
                        <div>
                            <h4 className="text-black300 text-[24px] leading-[28.8px] ont-bold capitalize">Filter</h4>
                        </div>
                        <button className="p-1 pb-[6px] pr-[6px]" onClick={() => setFilterActive(false)}>
                            <CLOSE_ICON/>
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 mt-2">
                        <DateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
                        <div className="px-[22px] flex flex-col gap-6">
                            <CustomSelectInput 
                                label="Transaction Type" 
                                options={['Store Transactions','Get Tipped', 'Withdrawal', 'Deposit', 'Chargebacks', 'Cashbacks', 'Refer & Earn']}
                                selectedOptions={selectedTransactionTypes}
                                setSelectedOptions={setSelectedTransactionTypes}
                            />
                            <CustomSelectInput 
                                label="Transaction Status" 
                                options={['Successful','Pending', 'Failed']}
                                selectedOptions={selectedTransactionStatus}
                                setSelectedOptions={setSelectedTransactionStatus}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 px-6 py-5">
                    <button className="py-3 border border-gray50 w-1/2 text-black300 text-base font-semibold leading-[24px] tracking-[0.4px] rounded-[100px]" onClick={() => { clearFilters(); setFilterActive(false)}}>Clear</button>
                    <button 
                        className="bg-black300 py-3 w-1/2 text-white text-base font-semibold leading-[24px] tracking-[0.4px] rounded-[100px]" 
                        //check for which filter exists and update state where necessary
                        onClick={() => {  
                            startDate && endDate ? setDateFilterInfo({ dateActive: true, dateLowerLimit: startDate, dateUpperLimit: endDate }) : setDateFilterInfo({ dateActive: false, dateLowerLimit: null, dateUpperLimit: null })
                            selectedTransactionTypes.length > 0 ? setTypeFilterInfo({ typeActive: true, typeArray: selectedTransactionTypes }) : setTypeFilterInfo({ typeActive: false, typeArray: [] })
                            selectedTransactionStatus.length > 0 ? setStatusFilterInfo({ statusActive: true, statusArray: selectedTransactionStatus }) : setStatusFilterInfo({ statusActive: false, statusArray: [] })
                            setFilterActive(false)
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Filter;