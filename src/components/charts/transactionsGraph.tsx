import formatDate from '@/helpers/formatDate';
import { IPaymentDetails } from '@/hooks/api/useFetchAllTransactions';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from 'recharts';


const TransactionsGraph = ({ transactions, transctionsLoading }: {
    transactions: IPaymentDetails[],
    transctionsLoading: boolean,
}) => {
    return (
        <div className='w-full'>
            <ResponsiveContainer width="100%" height={257}>
                <LineChart
                width={500}
                height={300}
                data={
                    transactions.map((transaction) => {
                        return{
                            name: transaction?.date,
                            amt: Number(transaction?.amount)
                        }
                    })
                }
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 0,
                }}
                >
                <XAxis dataKey="name" className='hidden'/>
                <Tooltip />
                <Line type="monotone" dataKey="amt" stroke="#FF5403" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
            <div>
                <div className='flex items-center'>
                    <div className='w-[4px] h-[4px] bg-gray100 rounded-full'></div>
                    <div className='border-t border-gray100 w-full'></div>
                    <div className='w-[4px] h-[4px] bg-gray100 rounded-full'></div>
                </div>
                <div className='flex justify-between mt-[15px]'>
                    <h5 className='text-gray400 text-sm font-medium -tracking-[0.2px]'>{ transctionsLoading ? '****' : formatDate(transactions[transactions.length - 1]?.date)}</h5>
                    <h5 className='text-gray400 text-sm font-medium -tracking-[0.2px]'>{ transctionsLoading ? '****' : formatDate(transactions[0]?.date)}</h5>
                </div>
            </div>
      </div>
    );
}

export default TransactionsGraph;