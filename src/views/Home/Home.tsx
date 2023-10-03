// import Table from "../../components/Tables/Currencies";
import { Fragment, ReactElement, lazy, Suspense } from 'react'
import Header from '../../components/Header/Header'
import Loading from '../../components/Loading/Loading'
// import Table from '../../components/Tables/Currencies'

const Table = lazy(() => import('../../components/Tables/Currencies'))

export default function Home(): ReactElement {
    return (
        <Fragment>
            <Header />
            <Suspense fallback={<Loading item="Table" />}>
                <Table />
            </Suspense>
        </Fragment>
    )
}
