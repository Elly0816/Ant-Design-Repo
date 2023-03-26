import Table from "../../components/Tables/Currencies";
import {Fragment, ReactElement, useContext, useEffect} from 'react';
import Header from '../../components/Header/Header';



export default function Home(): ReactElement {


return <Fragment>
        <Header/>
        <Table/>
    </Fragment>
}