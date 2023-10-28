import { FULL_ARROW } from "@/assets/icons/icons";

const TransactionCard = ({ description, recipient, amount, date, outflow }: {
    outflow?: boolean,
    description: string,
    recipient: string,
    amount: number,
    date: string,
}) => {
    
    return(
        <div className="flex justify-between">
            <div className="flex items-center gap-[14.5px]">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-green100 fill-green500 ${ outflow && '!rotate-180 !bg-red100 !fill-red400' }`}>
                    <FULL_ARROW/>
                </div>
                <div className="flex flex-col gap-[9px]">
                    <div><h4 className="text-black300 text-base font-medium -tracking-[0.2px] capitalize">{description}</h4></div>
                    <div><p className="text-gray400 text-sm font-medium -tracking-[0.2px] leading-[16px]">{recipient}</p></div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div><h4 className="text-right text-black300 text-base font-medium -tracking-[0.4px]">USD {Number(amount).toLocaleString()}</h4></div>
                <div><p className="text-gray400 text-sm font-medium tracking-[0.2px] text-right">{date}</p></div>
            </div>
        </div>
    )
}
export default TransactionCard;