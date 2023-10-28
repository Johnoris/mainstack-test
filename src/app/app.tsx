import Router from "@/router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-loading-skeleton/dist/skeleton.css'

const App = () => {
    return (
        <main>
            <Router/>
            <ToastContainer/>
        </main>
    )
}
export default App;