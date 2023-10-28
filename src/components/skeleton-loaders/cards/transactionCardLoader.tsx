import Skeleton from "react-loading-skeleton";

const TransactionCardLoader = () => {
    return(
        <div className="flex justify-between">
            <div className="flex items-center gap-[14.5px]">
                <Skeleton width={48} height={48} borderRadius={100}/>
                <div className="flex flex-col gap-[9px]">
                    <Skeleton width={170} height={10} borderRadius={10}/>
                    <Skeleton width={100} height={10} borderRadius={10}/>
                </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
                <Skeleton width={80} height={15} borderRadius={10}/>
                <Skeleton width={160} height={10} borderRadius={10}/>
            </div>
        </div>
    )
}
export default TransactionCardLoader;