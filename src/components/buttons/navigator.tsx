import { useLocation, useNavigate } from "react-router-dom"

interface INavigatorProps {
    icon: React.ReactNode,
    name: string,
    route: string,
}

const Navigator = ({ icon, name, route }: INavigatorProps) => {
    const location = useLocation();
    const isActive = location.pathname.includes(route)
    const router = useNavigate();

    return(
        <button onClick={() => router(route)} className={`flex items-center pl-[14px] pr-[18px] py-2 rounded-[100px] gap-1 text-gray400 fill-gray400 ${ isActive && '!bg-black300 !text-white !fill-white100' }`}>
            <span data-testid={name.toLowerCase()+"-icon"}></span>{icon}
            {name}
        </button>
    )
}
export default Navigator;