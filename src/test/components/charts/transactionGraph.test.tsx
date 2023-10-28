import TransactionsGraph from "@/components/charts/transactionsGraph"
import TestLayout from "@/test/testLayout"
import { render } from "@testing-library/react"

describe('TransactionGrpah renders successfully without crashing', () => {
    it('renders', () => {
        render(
            <TestLayout>
                <TransactionsGraph transactions={[]} transctionsLoading={true}/>
            </TestLayout>
        )
    })
})