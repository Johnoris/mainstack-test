import { useLocation, useNavigate } from "react-router-dom"

interface INavigatorProps {
    icon: React.ReactNode,
    name: string,
    route: string,
    data_testid?: string,
}

const Navigator = ({ icon, name, route }: INavigatorProps) => {
    const location = useLocation();
    const isActive = location.pathname.includes(route)
    const router = useNavigate();

    return(
        <button onClick={() => router(route)} className={`flex items-center pl-[14px] pr-[18px] py-2 rounded-[100px] gap-1 text-gray400 ${ isActive && '!bg-black300 !text-white' }`}>
            <span data-testid={name.toLowerCase()+"-icon"} className={`w-max ${isActive ? 'fill-white100' : 'fill-gray400' }`}>{icon}</span>
            {name}
        </button>
    )
}
export default Navigator;