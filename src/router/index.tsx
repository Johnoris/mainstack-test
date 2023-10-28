import Filter from "@/components/filter/filter";
import DashboardLayout from "@/layout/dashboardLayout";
import Home from "@/pages/home"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<DashboardLayout/>}>
                    <Route path='/' element={<Navigate to="/home"/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/analytics' element={<Home/>}/>
                    <Route path='/revenue' element={<Home/>}/>
                    <Route path='/crm' element={<Home/>}/>
                    <Route path='/apps' element={<Home/>}/>
                </Route>
                <Route path='/filter' element={<Filter/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;