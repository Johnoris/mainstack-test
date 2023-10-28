import SideBar from "@/components/navigation/sideBar"
import TestLayout from "@/test/testLayout"
import { render } from "@testing-library/react"

describe('Sidebar renders successfully without crashing', () => {
    it('renders', () => {
        render(
            <TestLayout>
                <SideBar/>
            </TestLayout>
        )
    })
})