import Nav from "@/components/navigation/nav"
import TestLayout from "@/test/testLayout"
import { render } from "@testing-library/react"

describe('Nav renders successfully without crashing', () => {
    it('renders', () => {
        render(
            <TestLayout>
                <Nav/>
            </TestLayout>
        )
    })
})