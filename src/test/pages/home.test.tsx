import Home from "@/pages/home"
import TestLayout from "@/test/testLayout"
import { render } from "@testing-library/react"

describe('Home renders successfully without crashing', () => {
    it('renders', () => {
        render(
            <TestLayout>
                <Home/>
            </TestLayout>
        )
    })
})