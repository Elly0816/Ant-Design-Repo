// import Table from "../../components/Tables/Currencies";
import {Fragment, ReactElement, lazy, Suspense} from 'react';
import Header from '../../components/Header/Header';
import Loading from "../../components/Loading/Loading";

const Table = lazy(()=> import("../../components/Tables/Currencies"));

export default function Home(): ReactElement {


return <Fragment>
        <Header/>
        <Suspense fallback={<Loading/>}>
            <Table/>
        </Suspense>
    </Fragment>
}