// import Table from "../../components/Tables/Favorites";
import {Fragment, ReactElement, lazy, Suspense} from 'react';
import Header from '../../components/Header/Header';
import Loading from "../../components/Loading/Loading";



export default function Favs(): ReactElement {

    const Table = lazy(() => import('../../components/Tables/Favorites'))



return <Fragment>
        <Header/>
        <Suspense fallback={<Loading item='Table'/>}>
            <Table/>
        </Suspense>
    </Fragment>
}