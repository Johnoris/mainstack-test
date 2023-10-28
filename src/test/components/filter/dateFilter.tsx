import DateFilter from "@/components/filter/dateFilter"
import TestLayout from "@/test/testLayout"
import { render } from "@testing-library/react"

describe('Date filter renders successfully without crashing', () => {
    it('renders', () => {
        render(
            <TestLayout>
                <DateFilter endDate={null} startDate={null} setEndDate={jest.fn} setStartDate={jest.fn} />
            </TestLayout>
        )
    })
})