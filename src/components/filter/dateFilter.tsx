/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface IDatePayload {
    label: 'Today' | 'Last 7 days' | 'This month' | 'Last 3 months' | 'This year' | 'Last year' | 'All time' | 'none', 
    startDate: Date, 
    endDate: Date
}

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }: {
    startDate: DateObject| DateObject[] | null | any,
    setStartDate: Dispatch<SetStateAction<DateObject| DateObject[] | null | any>>,
    endDate: DateObject| DateObject[] | null | any,
    setEndDate: Dispatch<SetStateAction<DateObject| DateObject[] | null | any>>,
}) => {
    const today = new Date()
    const yesterday = new Date()
    const tomorrow = new Date()
    yesterday.setDate(today.getDate() - 1)
    tomorrow.setDate(today.getDate() + 1)
    const aWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const beginningOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const beginningOfQuater = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    const beginningOfThisYear = new Date(today.getFullYear(), 0, 1);
    const beginningOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(today.getFullYear(), 0, 0);
    const year2000 = new Date(2000, 0, 1);

    const dateFilterOptions: IDatePayload[] = [
        {
            label: 'Today',
            startDate: today,
            endDate: today,
        },
        {
            label: 'Last 7 days',
            startDate: aWeekAgo,
            endDate: today
        },
        {
            label: 'This month',
            startDate: beginningOfMonth,
            endDate: today,
        },
        {
            label: 'Last 3 months',
            startDate: beginningOfQuater,
            endDate: today,
        },
        {
            label: 'This year',
            startDate: beginningOfThisYear,
            endDate: today
        },
        {
            label: 'Last year',
            startDate: beginningOfLastYear,
            endDate: endOfLastYear
        },
        {
            label: 'All time',
            startDate: year2000,
            endDate: today,
        }
    ]
    const [ activeRange, setActiveRange ] = useState<'Today' | 'Last 7 days' | 'This month' | 'Last 3 months' | 'This year' | 'Last year' | 'All time' | 'none' >('none')

    return(
        <div>
            <div className="flex gap-3 overflow-x-scroll px-[22px] hide-scrollbar">
                {
                    dateFilterOptions.length > 0 &&
                    dateFilterOptions.map((date: IDatePayload, index: number) => {
                        return(
                            <button key={index} className={`whitespace-nowrap rounded-[100px] border border-gray50 py-2.5 px-[18px] ${ (activeRange === date.label || ( date?.endDate?.toLocaleDateString() === new Date(endDate)?.toLocaleDateString() && date?.startDate?.toLocaleDateString() === new Date(startDate)?.toLocaleDateString() ) ) && '!border-none !bg-black300 !text-white' }`} onClick={() => { setStartDate(date.startDate); setEndDate(date.endDate); setActiveRange(date.label)}}>
                                {date.label}
                            </button>
                        )
                    })
                }
            </div>
            <div className="px-[22px] mt-[28px]">
                <div>
                    <h6 className="text-black300 text-base font-semibold -tracking-[0.4px]">Date Range</h6>
                </div>
                <div className="grid grid-cols-2 gap-[6px] mt-[3px]">
                    <DatePicker
                        value={ endDate ? startDate < endDate ? startDate : endDate : startDate}
                        onChange={(value) => { setActiveRange('none'); setStartDate(value)}}
                        inputClass={`bg-gray50 px-4 py-[14px] rounded-[12px] border-[3px] border-gray50 flex justify-between cursor-pointer no-outline w-full focus:border-black300' }`} 
                        className="green"
                        mapDays={({ date }: any) => {
                            if(date > tomorrow){
                                return{
                                    disabled: true,
                                    style: { color: "#ccc" },
                                }
                            }
                        }}
                    />
                    <DatePicker
                        value={ endDate ? endDate > startDate ? endDate : startDate : endDate}
                        onChange={(value) => { setActiveRange('none'); setEndDate(value)}}
                        inputClass={`bg-gray50 px-4 py-[14px] rounded-[12px] border-[3px] border-gray50 flex justify-between cursor-pointer no-outline w-full focus:border-black300' }`} 
                        mapDays={({ date }: any) => {
                            if(date > tomorrow){
                                return{
                                    disabled: true,
                                    style: { color: "#ccc" },
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default DateFilter;