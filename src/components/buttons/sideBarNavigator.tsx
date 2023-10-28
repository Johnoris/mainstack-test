import { ReactNode } from "react";

const SideBarNavigator = ({ icon }: { icon: ReactNode }) => {
    return(
        <button className="p-2">
            <div className="w-6 h-6 flex items-center justify-center mix-blend-luminosity hover:mix-blend-normal">
                {icon}
            </div>
        </button>
    )
}
export default SideBarNavigator;