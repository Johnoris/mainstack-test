import formatDate from '@/helpers/formatDate';
import { IPaymentDetails } from '@/hooks/api/useFetchAllTransactions';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from 'recharts';


const TransactionsGraph = ({ transactions, transctionsLoading }: {
    transactions: IPaymentDetails[],
    transctionsLoading: boolean,
}) => {

    //reorder the data with date and marge transactions that happened on same date
    const reorderAndMergeTransactions = (): { date: string, amount: number }[] => {
        transactions.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
        const mergedPayments = mergeTransctionsByDate();

        return mergedPayments;
    }

    const mergeTransctionsByDate = (): { date: string, amount: number }[] => {
        const dateMap: { [date: string]: number } = {};
        for (const transaction of transactions) {
            const date = transaction.date;
            const amount = Number(transaction.amount);
    
            if (!isNaN(amount)) {
                if (dateMap[date]) {
                    dateMap[date] += amount;
                } else {
                    dateMap[date] = amount;
                }
            }
        }
        const mergedPayments = Object.keys(dateMap).map(date => ({
            date: formatDate(date),
            amount: dateMap[date]
        }));
    
        return mergedPayments;
    }

    return (
        <div className='w-full'>
            <ResponsiveContainer width="100%" height={257}>
                <LineChart
                width={500}
                height={300}
                data={reorderAndMergeTransactions()}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 0,
                }}
                >
                <XAxis dataKey="date" className='hidden'/>
                <Tooltip formatter={(value) => ['USD ' + value]} />
                <Line type="monotone" dataKey="amount" stroke="#FF5403" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
            <div>
                <div className='flex items-center'>
                    <div className='w-[4px] h-[4px] bg-gray100 rounded-full'></div>
                    <div className='border-t border-gray100 w-full'></div>
                    <div className='w-[4px] h-[4px] bg-gray100 rounded-full'></div>
                </div>
                <div className='flex justify-between mt-[15px]'>
                    {/* get start date from reordered date */}
                    <h5 className='text-gray400 text-sm font-medium -tracking-[0.2px]'>{ transctionsLoading ? '****' : formatDate(reorderAndMergeTransactions()[0]?.date)}</h5>
                    {/* get end date from reordered data */}
                    <h5 className='text-gray400 text-sm font-medium -tracking-[0.2px]'>{ transctionsLoading ? '****' : formatDate(reorderAndMergeTransactions()[reorderAndMergeTransactions()?.length - 1]?.date)}</h5>
                </div>
            </div>
      </div>
    );
}

export default TransactionsGraph;