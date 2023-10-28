import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const TestLayout = ({children}: { children: React.ReactNode}) => {
    return(
        <BrowserRouter>
            <ToastContainer/>
            {children}
        </BrowserRouter>
    )
}
export default TestLayout;