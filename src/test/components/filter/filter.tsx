import Filter from "@/components/filter/filter"
import TestLayout from "@/test/testLayout"
import { render } from "@testing-library/react"

describe('Filter modal renders successfully without crashing', () => {
    it('renders', () => {
        render(
            <TestLayout>
                <Filter 
                    clearFilters={jest.fn} 
                    endDate={null} 
                    startDate={null} 
                    filterActive={true} 
                    selectedTransactionStatus={[]} 
                    setSelectedTransactionStatus={jest.fn} 
                    setDateFilterInfo={jest.fn} 
                    setEndDate={jest.fn} 
                    setFilterActive={jest.fn} 
                    setSelectedTransactionTypes={jest.fn} 
                    setStartDate={jest.fn} 
                    setStatusFilterInfo={jest.fn} 
                    setTypeFilterInfo={jest.fn} 
                    selectedTransactionTypes={[]}
                    reference={null}
                />
            </TestLayout>
        )
    })
})