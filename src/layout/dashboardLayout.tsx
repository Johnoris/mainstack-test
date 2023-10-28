import Nav from "@/components/navigation/nav";
import SideBar from "@/components/navigation/sideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return(
        <div>
            <Nav/>
            <SideBar/>
            <Outlet/>
        </div>
    )
}
export default DashboardLayout;