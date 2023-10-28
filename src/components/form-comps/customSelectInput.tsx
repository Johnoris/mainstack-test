import { ARROW, CHECK } from "@/assets/icons/icons";
import useCloseOnExternalClick from "@/hooks/useCloseOnExternalClick";
import { Dispatch, SetStateAction, useRef } from "react";

const CustomSelectInput = ({ options, selectedOptions, setSelectedOptions, label }: {
    selectedOptions: string[],
    setSelectedOptions: Dispatch<SetStateAction<string[]>>,
    label: string,
    options: string[],
}) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const [ focus, setFocus ] = useCloseOnExternalClick(inputRef);

    return(
        <div>
            <div>
                <h6 className="text-black300 text-base font-semibold -tracking-[0.4px]">{label}</h6>
            </div>
            <div className="mt-3 relative" ref={inputRef}>
                <div className={`bg-gray50 px-4 py-[14px] rounded-[12px] border-[3px] border-gray50 flex justify-between cursor-pointer ${ focus && '!border-black300' }`} onClick={() => setFocus(!focus)} data-testid="select-input">
                    <h5 className="text-black300 text-sm leading-[16px] font-medium -tracking-[0.2px] truncate">
                        {
                            selectedOptions.length > 0 
                                ?
                                selectedOptions.join(", ")
                                :
                                "Select an option"
                        }
                    </h5>
                    <div className={`min-w-5 ${ focus && 'rotate-180' }`}><ARROW/></div>
                </div>
                {
                    focus 
                    &&
                    <div className="shadow-appBar absolute top-[62px] bg-white w-full rounded-[12px] p-2 z-10">
                        {
                            options.length > 0 && options.map((option: string, index) => {
                                return(
                                // add to selectedOptions array if non-existent and remove if it exists
                                <div className="p-[14px] flex gap-3 items-center cursor-pointer w-full" key={index} onClick={() =>  selectedOptions.includes(option) ?  setSelectedOptions(prev => prev.filter( currentOption => currentOption !== option )) : setSelectedOptions(prev => [...prev,option])  }>
                                    {
                                        selectedOptions.includes(option)
                                            ?
                                            <CHECK/>
                                            :
                                            <div className="w-[17px] h-[17px] border border-white100 rounded"></div>
                                    }
                                    <div>
                                        <h5 className="text-base text-black300 font-semibold -tracking-[0.4px]">{option}</h5>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
export default CustomSelectInput;