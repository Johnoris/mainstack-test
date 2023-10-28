import { Component, ErrorInfo, ReactNode } from "react";

interface IErrorBoundaryProps{
    hasError: boolean,
    error: Error | null,
    errorInfo: ErrorInfo | null,
}

class ErrorBoundary extends Component<{children: ReactNode}> {
    constructor(props: { children: ReactNode}){
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    static getDerivedStateFromError(error: Error){
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
    }

    render () {

        if((this.state as IErrorBoundaryProps).hasError){
            return(
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <div className="mt-4">
                        <h2 className="text-[24px] font-bold leading-[36px] text-center">Oops, something went wrong!</h2>
                    </div>
                    <div className="mt-4 max-w-[350px]">
                        <p className="text-gray40 font-normal text-base text-center">The application has encountered an error, hit the button below to refresh.</p>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button className="bg-black300 text-white flex items-center text-base px-[52px] py-[14px] rounded-[100px] font-semi-bold" onClick={() => window.location.reload()}>
                            Refresh
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary;