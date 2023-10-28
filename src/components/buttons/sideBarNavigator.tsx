import { ReactNode } from "react";

const SideBarNavigator = ({ icon, test_id }: { icon: ReactNode, test_id?: string }) => {
    return(
        <button className="p-2" data-testid={test_id}>
            <div className="w-6 h-6 flex items-center justify-center mix-blend-luminosity hover:mix-blend-normal">
                {icon}
            </div>
        </button>
    )
}
export default SideBarNavigator;