/* eslint-disable @typescript-eslint/no-explicit-any */
import { ARROW, DOWNLOAD_ICON, INFO_ICON, RECEIPT_ICON } from "@/assets/icons/icons";
import TransactionCard from "@/components/cards/transactionCard";
import TransactionsGraph from "@/components/charts/transactionsGraph";
import Filter from "@/components/filter/filter";
import TransactionCardLoader from "@/components/skeleton-loaders/cards/transactionCardLoader";
import formatDate from "@/helpers/formatDate";
import useFetchWalletDetails from "@/hooks/api/useFetchWalletDetails";
import useFetchAllTransactions, { IPaymentDetails } from "@/hooks/api/useFetchAllTransactions";
import useCloseOnExternalClick from "@/hooks/useCloseOnExternalClick";
import { Fragment, useEffect, useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";

const Home = () => {
    const filterRef = useRef<HTMLDivElement>(null);
    const [ balanceLoading, walletDetails ] = useFetchWalletDetails();
    const [ transactionsLoading, transactions ] = useFetchAllTransactions();
    const [ filterActive, setFilterActive ] = useCloseOnExternalClick(filterRef);
    const [ startDate, setStartDate ] = useState<DateObject | DateObject[] | null | any>(null);
    const [ endDate, setEndDate ] = useState<DateObject | DateObject[] | null | any>(null);
    const [ selectedTransactionTypes, setSelectedTransactionTypes ] = useState<string[]>([]);
    const [ selectedTransactionStatus, setSelectedTransactionStatus ] = useState<string[]>([]);
    const [ filteredTransactions, setFilteredTransactions ] = useState<IPaymentDetails[]>([]);
    const [ dateFilterInfo, setDateFilterInfo ] = useState<{
        dateActive?: boolean,
        dateUpperLimit?: DateObject | DateObject[] | null | any,
        dateLowerLimit?: DateObject | DateObject[] | null | any,
    }>({
        dateActive: false,
        dateUpperLimit: '',
        dateLowerLimit: '',
    })
    const [ typeFilterInfo, setTypeFilterInfo ] = useState<{
        typeActive?: boolean,
        typeArray?: string[],
    }>({
        typeActive: false,
        typeArray: [],
    })
    const [ statusFilterInfo, setStatusFilterInfo ] = useState<{
        statusActive?: boolean,
        statusArray?: string[]
    }>({
        statusActive: false,
        statusArray: []
    })

    const clearFilters = () => {
        setSelectedTransactionTypes([])
        setSelectedTransactionStatus([])
        setEndDate(null)
        setStartDate(null)
        setDateFilterInfo({
            dateActive: false,
            dateUpperLimit: '',
            dateLowerLimit: '',
        })
        setTypeFilterInfo({
            typeActive: false,
            typeArray: [],
        })
        setStatusFilterInfo({
            statusActive: false,
            statusArray: []
        })
    }

    const filterWithDate = () => {
        setFilteredTransactions(
            transactions.filter((transaction) => {
              // Convert date strings to Date objects for comparison
              const transactionDate = new Date(transaction.date);
              const upperLimitDate = new Date(dateFilterInfo.dateUpperLimit);
              const lowerLimitDate = new Date(dateFilterInfo.dateLowerLimit);

              // Check if the transaction date is within the limit range
              return (
                transactionDate >= lowerLimitDate && transactionDate <= upperLimitDate
              );
            })
          );
    }

    const filterWithType = () => {
        //convert text to uppercase for comparison and filter with the set typeArray
        setFilteredTransactions(transactions.filter(transaction => typeFilterInfo.typeArray?.includes( transaction?.type?.charAt(0).toUpperCase() + transaction?.type?.slice(1))))
    }

    const filterWithStatus = () => {
        //convert text to uppercase for comparison and filter with the set statusArray
        setFilteredTransactions(transactions.filter(transaction => statusFilterInfo.statusArray?.includes(transaction?.status?.charAt(0).toUpperCase() + transaction?.status?.slice(1))))
    }

    //check for changes in upper and lower date limit and filter if bot limits exist 
    useEffect(() => {
        if(dateFilterInfo?.dateUpperLimit && dateFilterInfo?.dateLowerLimit){
            filterWithDate()
        }
    },[ dateFilterInfo.dateLowerLimit, dateFilterInfo.dateUpperLimit ])

    //check for changes to typeArray and filter if array is not empty
    useEffect(() => {
        if(typeFilterInfo?.typeArray?.length){
            typeFilterInfo?.typeArray?.length > 0 && filterWithType()
        }
    },[ typeFilterInfo.typeArray ])

    //check for changes to statusArray and filter if array is not empty
    useEffect(() => {
        if(statusFilterInfo?.statusArray?.length){
            statusFilterInfo?.statusArray?.length > 0 && filterWithStatus()
        }
    },[ statusFilterInfo?.statusArray ])

    //check if filters are applied 
    const filtersApplied = [dateFilterInfo.dateActive, typeFilterInfo?.typeActive, statusFilterInfo?.statusActive]?.filter(Boolean)?.length > 0
    return(
        <div className="max-w-[1160px] mx-auto pt-[144px]">
            <Filter 
                filterActive={filterActive} 
                setFilterActive={setFilterActive} 
                reference={filterRef}
                startDate={startDate}
                endDate={endDate}
                setEndDate={setEndDate}
                clearFilters={clearFilters}
                selectedTransactionStatus={selectedTransactionStatus}
                setSelectedTransactionStatus={setSelectedTransactionStatus}
                setSelectedTransactionTypes={setSelectedTransactionTypes}
                selectedTransactionTypes={selectedTransactionTypes}
                setStartDate={setStartDate}
                setDateFilterInfo={setDateFilterInfo}
                setTypeFilterInfo={setTypeFilterInfo}
                setStatusFilterInfo={setStatusFilterInfo}
            />
            <div className="flex justify-between gap-[124px]">
                <div className="w-full">
                    <div>
                        <div className="flex gap-[64px] items-center">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <h5 className="text-gray400 tsxt-sm font-medium leading-[16px] -tracking-[0.2px]">Available Balance</h5>
                                </div>
                                <div>
                                    <h2 className="text-black300 text-[36px] font-bold leading-[48px] -trakcing-[1.5px]">USD { balanceLoading ? '****' : Number(walletDetails?.balance).toLocaleString() }</h2>
                                </div>
                            </div>
                            <button className="px-[52px] py-[14px] rounded-[100px] bg-black300 text-base text-white font-semibold -tracking-[0.4px]">
                                Withdraw
                            </button>
                        </div>
                    </div>
                    <div>
                        <TransactionsGraph transactions={transactions} transctionsLoading={transactionsLoading}/>
                    </div>
                </div>
                <div className="w-[271px] flex flex-col gap-[34px]">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                            <h5 className="text-gray400 text-sm leading-[16px] font-medium -tracking-[0.2px]">Ledger Balance</h5>
                            <INFO_ICON/>
                        </div>
                        <div>
                            <h3 className="text-[28px] text-black300 font-bold leading-[38px] -tracking-[0.6px]">USD { balanceLoading ? '***' : Number(walletDetails?.ledger_balance).toLocaleString() }</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                            <h5 className="text-gray400 text-sm leading-[16px] font-medium -tracking-[0.2px]">Total Payout</h5>
                            <INFO_ICON/>
                        </div>
                        <div>
                            <h3 className="text-[28px] text-black300 font-bold leading-[38px] -tracking-[0.6px]">USD { balanceLoading ? '***' : Number(walletDetails?.total_payout).toLocaleString() }</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                            <h5 className="text-gray400 text-sm leading-[16px] font-medium -tracking-[0.2px]">Total Revenue</h5>
                            <INFO_ICON/>
                        </div>
                        <div>
                            <h3 className="text-[28px] text-black300 font-bold leading-[38px] -tracking-[0.6px]">USD { balanceLoading ? '***' : Number(walletDetails?.total_revenue).toLocaleString() }</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                            <h5 className="text-gray400 text-sm leading-[16px] font-medium -tracking-[0.2px]">Pending Payout</h5>
                            <INFO_ICON/>
                        </div>
                        <div>
                            <h3 className="text-[28px] text-black300 font-bold leading-[38px] -tracking-[0.6px]">USD { balanceLoading ? '***' : Number(walletDetails?.pending_payout).toLocaleString() }</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[86px]">
                <div className="flex justify-between border-b border-gray50 pb-6">
                    <div>
                        <div>
                            <h3 className="text-black300 text-[24px] font-bold leading-[32px] -tracking-[0.6px]">
                                { 
                                    transactionsLoading 
                                        ? 
                                        '**' 
                                        :
                                        //render transactions lengh | reder filtered transactions length if filters are applied 
                                        filtersApplied ? filteredTransactions?.length : transactions?.length
                                } 
                                {" "}Transactions
                            </h3>
                        </div>
                        {/* render correct time range | show all time if there is no time range */}
                        <div><p className="text-gray400 text-sm font-medium leading-[16px] -tracking-[0.2px]">{ dateFilterInfo?.dateActive ? `Your transactions from ${formatDate(dateFilterInfo?.dateLowerLimit)} to ${formatDate(dateFilterInfo?.dateUpperLimit)}` : "Your transactions for all time"}</p></div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center py-3 pl-[30px] pr-[20px] bg-gray50 rounded-[100px] gap-1 items-center text-base font-semibold -tracking-[0.4px]" onClick={() => setFilterActive(true)} data-testid="open-filter-button">
                            Filter
                            { 
                                //check if filters applied and render lenght in button where necessary
                                filtersApplied && 
                                <div className="w-5 h-5 rounded-full bg-black300 flex items-center justify-center">
                                    <h5 className="text-xs font-medium text-white -tracking-[0.4px]">{[dateFilterInfo.dateActive, typeFilterInfo?.typeActive, statusFilterInfo?.statusActive]?.filter(Boolean)?.length}</h5>
                                </div>
                            }
                            <ARROW/>
                        </button>
                        <button className="flex items-center py-3 pl-[30px] pr-[20px] bg-gray50 rounded-[100px] gap-1 items-center text-base font-semibold -tracking-[0.4px]">
                            Export list
                            <DOWNLOAD_ICON/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 pt-[33px] pb-10">
                    {
                        transactionsLoading
                            ?
                            <Fragment>
                                <TransactionCardLoader/>
                                <TransactionCardLoader/>
                                <TransactionCardLoader/>
                                <TransactionCardLoader/>
                                <TransactionCardLoader/>
                            </Fragment>
                            :
                            //check if filters are applied and render filtered data else render transactions
                            filtersApplied
                                ?
                                filteredTransactions.length > 0
                                    ?
                                    filteredTransactions.map((transaction:IPaymentDetails, index) => {
                                        return(
                                            <TransactionCard key={index} amount={Number(transaction?.amount)} date={formatDate(transaction?.date)} description={transaction?.metadata?.product_name || transaction?.metadata?.type || "Nil"} recipient={transaction?.metadata?.name || "Nil"} outflow={transaction?.type === 'withdrawal'}/>
                                        )
                                    })
                                    :
                                    <div className="w-full flex justify-center">
                                        <div className="max-w-[369px]">
                                            <div className="p-3 rounded-[16px] bg-card-gradient w-max">
                                                <RECEIPT_ICON/>
                                            </div>
                                            <div className="mt-5">
                                                <h3 className="text-black300 text-[28px] font-bold leading-[40px] -tracking-[0.6px]">
                                                    No matching transaction found for the selected filter
                                                </h3>
                                            </div>
                                            <div className="mt-2.5">
                                                <p className="text-gray400 text-base font-medium -tracking-[0.2px]">Change your filters to see more results, or add a new product.</p>
                                            </div>
                                            <button className="text-base font-semibold -tracking-[0.4px] text-black300 py-3 px-6 rounded-[100px] bg-gray50 mt-8" onClick={() => clearFilters()}>
                                                Clear Filter
                                            </button>
                                        </div>
                                    </div>
                                :
                                transactions.length > 0
                                    ?
                                    transactions.map((transaction:IPaymentDetails, index) => {
                                        return(
                                            <TransactionCard key={index} amount={Number(transaction?.amount)} date={formatDate(transaction?.date)} description={transaction?.metadata?.product_name || transaction?.metadata?.type || "Nil"} recipient={transaction?.metadata?.name || "Nil"} outflow={transaction?.type === 'withdrawal'}/>
                                        )
                                    })
                                    :
                                    <div className="w-full flex justify-center">
                                        <div className="max-w-[369px]">
                                            <div className="p-3 rounded-[16px] bg-card-gradient w-max">
                                                <RECEIPT_ICON/>
                                            </div>
                                            <div className="mt-5">
                                                <h3 className="text-black300 text-[28px] font-bold leading-[40px] -tracking-[0.6px]">
                                                    No transactions found 
                                                </h3>
                                            </div>
                                            <div className="mt-2.5">
                                                <p className="text-gray400 text-base font-medium -tracking-[0.2px]">Create a transaction and view info here</p>
                                            </div>
                                            <button className="text-base font-semibold -tracking-[0.4px] text-black300 py-3 px-6 rounded-[100px] bg-gray50 mt-8">
                                                Create transaction
                                            </button>
                                        </div>
                                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;