import { ANALYSIS_ICON, APPS_ICON, CRM_ICON, HAMBURGER_MENU, HOME_ICON, INITIALS_CONTAINER, LOGO, MESSAGES_ICON, NOTIFICATIONS_ICON, REVENUE_ICON } from "@/assets/icons/icons";
import Navigator from "../buttons/navigator";
import useFetchUserInfo from "@/hooks/api/useFetchUserInfo";

const Nav = () => {
    const [ isLoading, initials ] = useFetchUserInfo()

    return(
        <nav className="fixed px-4 pt-4 w-full z-20">
            <div className="shadow-light100 rounded-[100px] border-[2px] border-white flex justify-between items-center p-3 pl-6 w-full bg-white h-[64px]">
                <div data-testid="logo">
                    <LOGO/>
                </div>
                <div className="flex gap-5">
                    <Navigator icon={<HOME_ICON/>} name="Home" route="/home"/>
                    <Navigator icon={<ANALYSIS_ICON/>} name="Analytics" route="/analytics"/>
                    <Navigator icon={<REVENUE_ICON/>} name="Revenue" route="/revenue"/>
                    <Navigator icon={<CRM_ICON/>} name="CRM" route="/crm"/>
                    <Navigator icon={<APPS_ICON/>} name="Apps" route="/apps"/>
                </div>
                <div className="flex gap-2 items-center">
                    <button className="p-[10px]" data-testid="notifications-button">
                        <NOTIFICATIONS_ICON/>
                    </button>
                    <button className="p-[10px]" data-testid="messages-button">
                        <MESSAGES_ICON/>
                    </button>
                    <div className="flex gap-2 items-center bg-gray50 rounded-[100px] py-1 pl-[5px] pr-3">
                        <div className="rounded-full relative cursor-pointer">
                            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                                <h4 className="text-sm font-semibold leading-[16px] -tracking-[0.4px] text-white uppercase" data-testid="initials">
                                    { isLoading ? '**' : initials }
                                </h4>
                            </div>
                            <INITIALS_CONTAINER/>
                        </div>
                        <div className="cursor-pointer" data-testid="hamburger-menu"><HAMBURGER_MENU/></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Nav;