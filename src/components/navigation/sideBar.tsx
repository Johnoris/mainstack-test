import { INVOICING_ICON, LINK_ICON, MEDIA_KIT_ICON, STORE_ICON } from "@/assets/icons/icons";
import SideBarNavigator from "../buttons/sideBarNavigator";

const SideBar = () => {
    return(
        <div className="h-[100dvh] fixed left-[16px] top-0 flex items-center">
            <div className="rounded-[100px] p-1 flex flex-col gap-2 shadow-appBar h-max bg-white">
                <SideBarNavigator icon={<LINK_ICON />} test_id="link-icon" />
                <SideBarNavigator icon={<STORE_ICON />} test_id="store-icon" />
                <SideBarNavigator icon={<MEDIA_KIT_ICON />} test_id="media-kit-icon" />
                <SideBarNavigator icon={<INVOICING_ICON />} test_id="invoicing-icon" />
            </div>
        </div>
    )
}
export default SideBar;